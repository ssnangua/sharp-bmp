# sharp-bmp

Bmp encoder and decoder for [sharp](https://www.npmjs.com/package/sharp) base on [bmp-js](https://www.npmjs.com/package/bmp-js).

## Install

```bash
npm install sharp-bmp
```

## Usage

### Create an instance of sharp from a BMP image

```js
const bmp = require("sharp-bmp");

bmp.sharpFromBmp("input.bmp", {
  // sharp constructor options
}) // returns an instance of sharp
  .toFile("output.png");
```

### Write output image data to a BMP file

```js
const sharp = require("sharp");
const bmp = require("sharp-bmp");

const image = sharp("input.jpg");

bmp.sharpToBmp(image, "output.bmp")
  .then((info) => {
    console.log(info); // { size, width, height }
  })
  .catch((err) => {
    console.error(err);
  });
```

### Decode BMP

```js
const fs = require("fs");
const sharp = require("sharp");
const bmp = require("sharp-bmp");

const buffer = fs.readFileSync("input.bmp");
const bitmap = bmp.decode(buffer);

sharp(bitmap.data, {
  raw: {
    width: bitmap.width,
    height: bitmap.height,
    channels: 4,
  },
})
  .toFile("output.png");
```

### Encode BMP

```js
const fs = require("fs");
const sharp = require("sharp");
const BMP = require("sharp-bmp");

async function convert() {
  const image = sharp("input.jpg");
  const buffer = await image.ensureAlpha().raw().toBuffer();
  const metadata = await image.metadata();
  const bitmap = {
    data: buffer,
    width: metadata.width,
    height: metadata.height,
  };
  const rawData = BMP.encode(bitmap);
  fs.writeFileSync("output.bmp", rawData.data);

  console.log(rawData.data.length); // size of output.bmp
}
convert();
```
