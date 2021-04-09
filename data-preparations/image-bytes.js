const files = {
  'giraffe.png':
    'Steganography is the practice of concealing a message within another message or a physical object.\0',
  'skull.png':
    'Whereas cryptography is the practice of protecting the contents of a message alone, steganography is concerned with concealing the fact that a secret message is being sent and its contents.\0',
  'dog.png':
    'The word steganography comes from Greek steganographia, which combines the words steganós, meaning "covered or concealed", and -graphia meaning "writing".\0',
  'bear.png':
    'The advantage of steganography over cryptography alone is that the intended secret message does not attract attention to itself as an object of scrutiny. Plainly visible encrypted messages, no matter how unbreakable they are, arouse interest and may in themselves be incriminating in countries in which encryption is illegal.\0',
};

const Jimp = require('jimp');

const encrypt = (fileName, input) => {
  const messageBytes = input.split('').map((char) => char.charCodeAt(0));

  Jimp.read(`../public/${fileName}`)
    .then((image) => {
      const width = image.bitmap.width;
      const height = image.bitmap.height;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
          const g = x < messageBytes.length && y == 0 ? messageBytes[x] : pixel.g;
          const color = Jimp.rgbaToInt(pixel.r, g, pixel.b, 255);
          image.setPixelColor(color, x, y);
        }
      }
      image.write(`../public/B${fileName}`, (err) => {
        if (err) {
          throw err;
        }
      });
    })
    .catch((err) => {
      throw err;
    });
};

Object.entries(files).map(([fileName, input]) => {
  encrypt(fileName, input);
});
