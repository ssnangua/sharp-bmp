const fs = require("fs");
const bmp = require("bmp-js");
const sharp = require("sharp");

function scan(bitmap, f) {
  const w = Math.round(bitmap.width);
  const h = Math.round(bitmap.height);
  for (let _y = 0; _y < h; _y++) {
    for (let _x = 0; _x < w; _x++) {
      const index = (bitmap.width * _y + _x) << 2;
      f.call(bitmap, index);
    }
  }
  return bitmap;
}

function fromAGBR(bitmap) {
  return scan(bitmap, (index) => {
    const alpha = bitmap.data[index + 0];
    const blue = bitmap.data[index + 1];
    const green = bitmap.data[index + 2];
    const red = bitmap.data[index + 3];
    bitmap.data[index + 0] = red;
    bitmap.data[index + 1] = green;
    bitmap.data[index + 2] = blue;
    bitmap.data[index + 3] = bitmap.is_with_alpha ? alpha : 0xff;
  });
}

function toAGBR(bitmap) {
  return scan(bitmap, (index) => {
    const red = bitmap.data[index + 0];
    const green = bitmap.data[index + 1];
    const blue = bitmap.data[index + 2];
    const alpha = bitmap.data[index + 3];
    bitmap.data[index + 0] = alpha;
    bitmap.data[index + 1] = blue;
    bitmap.data[index + 2] = green;
    bitmap.data[index + 3] = red;
  });
}

function decode(buffer) {
  return fromAGBR(bmp.decode(buffer));
}

function encode(bitmap) {
  return bmp.encode(toAGBR(bitmap));
}

function sharpFromBmp(input, options) {
  const buffer = fs.readFileSync(input);
  const bitmap = decode(buffer);
  const image = sharp(bitmap.data, {
    ...options,
    raw: {
      width: bitmap.width,
      height: bitmap.height,
      channels: 4,
    },
  });
  return image;
}

async function sharpToBmp(image, fileOut) {
  const { data, info } = await image
    .flatten({ background: '#ffffff' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const bitmap = {
    data,
    width: info.width,
    height: info.height,
  };
  const rawData = encode(bitmap);
  try {
    fs.writeFileSync(fileOut, rawData.data);
    return {
      width: info.width,
      height: info.height,
      size: rawData.data.length,
    };
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  encode,
  decode,
  sharpFromBmp,
  sharpToBmp,
};
