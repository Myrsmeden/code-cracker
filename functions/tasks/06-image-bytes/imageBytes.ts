const files = {
  'giraffe.png':
    'Steganography is the practice of concealing a message within another message or a physical object.',
  'skull.png':
    'Whereas cryptography is the practice of protecting the contents of a message alone, steganography is concerned with concealing the fact that a secret message is being sent and its contents.',
  'dog.png':
    'The word steganography comes from Greek steganographia, which combines the words steganós, meaning "covered or concealed", and -graphia meaning "writing".',
  'bear.png':
    'The advantage of steganography over cryptography alone is that the intended secret message does not attract attention to itself as an object of scrutiny. Plainly visible encrypted messages, no matter how unbreakable they are, arouse interest and may in themselves be incriminating in countries in which encryption is illegal.',
};

const encrypt = (value: string): string => {
  const entries = Object.entries(files);
  for (let i = 0; i < entries.length; i++) {
    if (entries[i][1] === value) {
      return `https://code-cracker.netlify.app/By_${entries[i][0]}`;
    }
  }
};

const decrypt = (input: string): string => input;

export default {
  id: 6,
  encrypt,
  decrypt,
  indata: Object.values(files),
  information: [
    {
      html:
        'As you see, we do not get a code to decrypt this time. Instead, we seem to get a link to the image. The image itself is not encrypted since we can open it, and we cannot find any hidden information inside the metadata of the image. However, the images seem to be a bit "off" in the upper left corner',
      level: 'Required',
    },
    {
      html:
        'On a computer screen, the colors are composed of some red, green and blue light. With all these 0 we will get black, and with all 255, which is the maximum, we will get white. The range 0 - 255 is also a byte, which means that we can hold information about a character on the keyboard (such as letters, numbers and punctuation).',
      level: 'Hard',
    },
    {
      html:
        'After loading multiple images, we can see that the pixels in the upper left corner seem to go towards green or purple, so our assumption is that the green channel is the one that is changed',
      level: 'Medium',
    },
    {
      html:
        'We are pretty convinced that the characters of hidden message has been converted to their corresponding ASCII-values, and those values are then replaced as the green pixel values. It looks like a message is also terminated by the character "\\0"',
      level: 'Easy',
    },
  ],
};
