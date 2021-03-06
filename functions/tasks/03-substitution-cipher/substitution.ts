const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

const getOffset = (input: string): number => {
  return input.length % ALPHABET.length;
};
const encrypt = (input: string): string => {
  const offset = getOffset(input);
  const shifted = ALPHABET.slice(offset).concat(ALPHABET.slice(0, offset));
  return input
    .split('')
    .map((letter) =>
      letter.charCodeAt(0) === 32 ? ' ' : shifted[ALPHABET.findIndex((l) => l === letter)]
    )
    .join('');
};

const decrypt = (input: string): string => {
  const offset = getOffset(input);
  const shifted = ALPHABET.slice(offset).concat(ALPHABET.slice(0, offset));

  return input
    .split('')
    .map((letter) =>
      letter.charCodeAt(0) === 32 ? ' ' : ALPHABET[shifted.findIndex((l) => l === letter)]
    )
    .join('');
};

export default {
  id: 3,
  encrypt,
  decrypt,
  indata: [
    'the greatest glory in living lies not in never falling but in rising every time we fall',
    'the way to get started is to quit talking and begin doing',
    'when you reach the end of your rope tie a knot in it and hang on',
    'always remember that you are absolutely unique just like everyone else',
    'it is during our darkest moments that we must focus to see the light',
    'whoever is happy will make others happy too',
  ],
  information: [
    {
      html:
        'It seems like the code is some kind of substitution encryption by the looks of the code. We are assuming that we are working with a "Caesar Cipher", but we have no idea how many steps to turn our "word wheel".',
      level: 'Hard',
    },
    {
      html:
        'Each time we connect to get the crypto, we seem to get new messages. And we are not sure if they all are using the same offset or not. We think that we might need to generate all possible solutions and then automate it by comparing the output with a list of common English words',
      level: 'Medium',
    },
  ],
};
