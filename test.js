const fs = require("fs");
const sharp = require("sharp");
const bmp = require("./index");

/**
 * Create an instance of sharp from a BMP image
 */
// bmp.sharpFromBmp("input.bmp").toFile("output.png");

/**
 * Buffer input
 */
// const buffer = fs.readFileSync("input.bmp");
// bmp.sharpFromBmp(buffer).toFile("output.png");

/**
 * Return an object with decoding info
 */
// const bmpData = bmp.sharpFromBmp("input.bmp", null, true);
// console.log(bmpData.width, bmpData.height);
// bmpData.image.toFile("output.png");
// fs.writeFileSync("output.bmp", bmpData.buffer);

/**
 * Write output image data to a BMP file
 */
// const image = sharp("input.jpg");
// bmp
//   .sharpToBmp(image, "output.bmp")
//   .then((info) => {
//     console.log(info);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

/**
 * Decode BMP
 */
// const buffer = fs.readFileSync("input.bmp");
// const bitmap = bmp.decode(buffer);
// sharp(bitmap.data, {
//   raw: {
//     width: bitmap.width,
//     height: bitmap.height,
//     channels: 4,
//   },
// }).toFile("output.png");

/**
 * Encode BMP
 */
// (async () => {
//   const image = sharp("input.jpg");
//   const { data, info } = await image
//     .flatten({ background: "#ffffff" })
//     .ensureAlpha()
//     .raw()
//     .toBuffer({ resolveWithObject: true });
//   const bitmap = {
//     data,
//     width: info.width,
//     height: info.height,
//   };
//   const rawData = bmp.encode(bitmap);
//   console.log(rawData);
//   fs.writeFileSync("output.bmp", rawData.data);
// })();
