const Jimp = require('jimp');

const decrypt = (fileName) => {
  return new Promise((resolve, reject) => {
    Jimp.read(`../public/${fileName}`)
      .then((image) => {
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        const messageBytes = [];
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
            const g = pixel.g;
            if (g === 0) {
              resolve(messageBytes);
              return;
            }
            messageBytes.push(g);
          }
        }
      })
      .catch(reject);
  });
};

(async () => {
  const message = await decrypt('By_giraffe.png');
  console.log(message.map((code) => String.fromCharCode(code)).join(''));
})();
