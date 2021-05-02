import chapters from './chapters';

const translatedWords = {};

const findWord = (input: string, chapters: string[][]) => {
  for (let chapterIndex = 0; chapterIndex < chapters.length; chapterIndex++) {
    for (let lineIndex = 0; lineIndex < chapters[chapterIndex].length; lineIndex++) {
      const position = chapters[chapterIndex][lineIndex].split(' ').indexOf(input);
      if (position > -1) {
        return `${chapterIndex + 1}:${lineIndex + 1}:${position + 1}`;
      }
    }
  }

  return null;
};

const translateWord = (input, chapters) => {
  if (!translatedWords[input]) {
    const translation = findWord(input, chapters);
    if (!translation) {
      console.log(`The word ${input} is not in the book!`);
    }
    translatedWords[input] = translation;
  }

  return translatedWords[input];
};

const encrypt = (input: string): string =>
  input
    .split(/\s+/)
    .map((word) => translateWord(word, chapters))
    .join(' ');

const decrypt = (input: string): string =>
  input
    .split(/\s+/)
    .map((key) => {
      const [chapterIndex, lineIndex, position] = key.split(':');
      const word = chapters[Number(chapterIndex) - 1][Number(lineIndex) - 1].split(' ')[
        Number(position) - 1
      ];
      return word;
    })
    .join(' ');

export default {
  id: 5,
  encrypt,
  decrypt,
  indata: [
    'Hur liten kan man bli innan man försvinner',
    'Det är lättare att riva ner en järnvägsstation än att riva upp ett beslut',
    'blir det som du säger eller måste du säga som det blir',
    'Ni kan väl inte se någonting som inte finns',
  ],
  information: [
    {
      html:
        'When listening to phone calls, it seems like the code creators are a fan of Swedish litterature and especially this book: <a href="/nils-holgersson.txt" target="_new">nils-holgersson.txt</a>',
      level: 'Required',
    },
    {
      html:
        'It seems that this is a new code system and this time only digits and colons are being used. Digits are grouped in groups of three, with colons in between.',
      level: 'Hard',
    },
    {
      html:
        'We think that three-number groups represents individual words. It also seems that punctuation characters, like periods and dashes, are skipped. Interestingly, the first number of each number-group is never that large. Also, some number-groups are way more common than other.',
      level: 'Medium',
    },
  ],
};
