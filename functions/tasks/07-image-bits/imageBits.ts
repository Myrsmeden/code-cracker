const files = {
  'giraffe.png':
    'Steganography includes the concealment of information within computer files. In digital steganography, electronic communications may include steganographic coding inside of a transport layer, such as a document file, image file, program, or protocol. Media files are ideal for steganographic transmission because of their large size.',
  'skull.png':
    'For example, a sender might start with an innocuous image file and adjust the color of every hundredth pixel to correspond to a letter in the alphabet. The change is so subtle that someone who is not specifically looking for it is unlikely to notice the change.',
  'dog.png':
    'The larger the cover message (in binary data, the number of bits) relative to the hidden message, the easier it is to hide the hidden message (as an analogy, the larger the "haystack", the easier it is to hide a "needle"). So digital pictures, which contain much data, are sometimes used to hide messages on the Internet and on other digital communication media. It is not clear how common this practice actually is.',
  'bear.png':
    'Stated somewhat more formally, the objective for making steganographic encoding difficult to detect is to ensure that the changes to the carrier (the original signal) because of the injection of the payload (the signal to covertly embed) are visually (and ideally, statistically) negligible. The changes are indistinguishable from the noise floor of the carrier. All media can be a carrier, but media with a large amount of redundant or compressible information is better suited.',
};

const encrypt = (value: string): string => {
  const entries = Object.entries(files);
  for (let i = 0; i < entries.length; i++) {
    if (entries[i][1] === value) {
      return `https://code-cracker.netlify.app/bi_${entries[i][0]}`;
    }
  }
};

const decrypt = (input: string): string => input;

export default {
  id: 7,
  encrypt,
  decrypt,
  indata: Object.values(files),
  information: [
    {
      html:
        'At first, this task seem very similar to the previous one. However, now we cannot see any visible changes to the image. The only clue we have is the file name. Previously, the files started with a "By", but these seem to start with "bi".',
      level: 'Required',
    },
    {
      html:
        'The human eye is not that good at noticing slight hue differences between different pixels in an image. If we were to change a black pixel (0, 0, 0) to (0, 1, 0), it will have a slight greenish tint but the human eye would not notice.',
      level: 'Hard',
    },
    {
      html:
        'If they then change the rightmost bit for the first eight pixels in the image, they would be able to encode one byte of data.',
      level: 'Medium',
    },
  ],
};
