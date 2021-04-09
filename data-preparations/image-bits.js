const files = {
  'giraffe.png':
    'Steganography includes the concealment of information within computer files. In digital steganography, electronic communications may include steganographic coding inside of a transport layer, such as a document file, image file, program, or protocol. Media files are ideal for steganographic transmission because of their large size.\0',
  'skull.png':
    'For example, a sender might start with an innocuous image file and adjust the color of every hundredth pixel to correspond to a letter in the alphabet. The change is so subtle that someone who is not specifically looking for it is unlikely to notice the change.\0',
  'dog.png':
    'The larger the cover message (in binary data, the number of bits) relative to the hidden message, the easier it is to hide the hidden message (as an analogy, the larger the "haystack", the easier it is to hide a "needle"). So digital pictures, which contain much data, are sometimes used to hide messages on the Internet and on other digital communication media. It is not clear how common this practice actually is.\0',
  'bear.png':
    'Stated somewhat more formally, the objective for making steganographic encoding difficult to detect is to ensure that the changes to the carrier (the original signal) because of the injection of the payload (the signal to covertly embed) are visually (and ideally, statistically) negligible. The changes are indistinguishable from the noise floor of the carrier. All media can be a carrier, but media with a large amount of redundant or compressible information is better suited.\0',
};

const Jimp = require('jimp');

const encrypt = (fileName, input) => {
  const messageBytes = input.split('').map((char) => char.charCodeAt(0));
  const messageBits = messageBytes.reduce((acc, byte) => {
    const bits = byte.toString(2).split('').map(Number);
    const padded = [0, 0, 0, 0, 0, 0, 0, 0, ...bits];
    return [...acc, ...padded.slice(padded.length - 8)];
  }, []);

  Jimp.read(`../public/${fileName}`)
    .then((image) => {
      const width = image.bitmap.width;
      const height = image.bitmap.height;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const bitPosition = y * width + x;
          const bit = bitPosition < messageBits.length ? messageBits[bitPosition] : null;
          const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
          let g = pixel.g;
          if (bit !== null) {
            g = (g & 0xfe) + bit;
          }
          const color = Jimp.rgbaToInt(pixel.r, g, pixel.b, 255);
          image.setPixelColor(color, x, y);
        }
      }
      image.write(`../public/bi_${fileName}`, (err) => {
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
