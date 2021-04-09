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

            if (
              messageBytes.length > 8 &&
              messageBytes.slice(-8).reduce((acc, item) => acc + item, 0) === 0
            ) {
              resolve(messageBytes);
              return;
            }
            messageBytes.push(g % 2);
          }
        }
      })
      .catch(reject);
  });
};

const chunk = (arr, len) => {
  const chunks = [],
    n = arr.length;
  let i = 0;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }

  return chunks;
};

(async () => {
  const messageBits = await decrypt('bi_giraffe.png');
  const chunks = chunk(messageBits, 8);
  const message = chunks
    .map((chunk) => {
      const code = parseInt(chunk.join(''), 2);
      return String.fromCharCode(code);
    })
    .join('');

  console.log(message);
})();
