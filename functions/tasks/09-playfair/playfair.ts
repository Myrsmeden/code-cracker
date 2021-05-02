const ALPHABET = 'abcdefghiklmnopqrstuvwxyz';
const INSERT_CHAR = 'x';

const hasDouble = (pairs: string[]): boolean =>
  pairs.some((pair) => pair.length > 1 && pair[0] === pair[1]);

const replaceDouble = (pairs: string[]): string[] => {
  const doubleIndex = pairs.findIndex((pair) => pair.length > 1 && pair[0] === pair[1]);
  const beforeDouble = pairs.slice(0, doubleIndex);
  const afterDouble = pairs.slice(doubleIndex);
  afterDouble[0] = afterDouble[0].split('').join(INSERT_CHAR);

  return (beforeDouble.join('') + afterDouble.join('')).match(/..?/g);
};

const removeDuplicateCharacters = (string: string): string => {
  return string
    .split('')
    .filter(function (item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .join('');
};

const findIndexes = (grid: string[], pair: string): [number, number] => {
  const firstLetterIndex = grid.findIndex((item) => item === pair[0]);
  const secondLetterIndex = grid.findIndex((item) => item === pair[1]);
  return [firstLetterIndex, secondLetterIndex];
};

const sameRow = (firstLetterIndex: number, secondLetterIndex: number): boolean => {
  const firstRowNumber = Math.floor(firstLetterIndex / 5);
  const secondRowNumber = Math.floor(secondLetterIndex / 5);
  return firstRowNumber === secondRowNumber;
};

const sameColumn = (firstLetterIndex: number, secondLetterIndex: number): boolean => {
  const firstColumnNumber = firstLetterIndex % 5;
  const secondColumnNumber = secondLetterIndex % 5;
  return firstColumnNumber === secondColumnNumber;
};

const encrypt = (input: string, KEY = 'liverpool'): string => {
  const sanitized = input.toLowerCase().replace(/[^A-Za-z]/g, '');

  let pairs = sanitized.match(/..?/g);
  while (hasDouble(pairs)) {
    pairs = replaceDouble(pairs);
  }
  if (pairs[pairs.length - 1].length === 1) {
    pairs[pairs.length - 1] += INSERT_CHAR;
  }

  pairs = pairs.map((pair) => pair.replace(/[j]/g, 'i'));
  const keyWithoutDuplicates = removeDuplicateCharacters(KEY);
  const alphabetWithoutKey = ALPHABET.split('')
    .filter((letter) => !KEY.includes(letter))
    .join('');
  const grid = (keyWithoutDuplicates + alphabetWithoutKey).split('');
  const encoded = pairs.map((pair) => {
    const [firstLetterIndex, secondLetterIndex] = findIndexes(grid, pair);
    if (sameRow(firstLetterIndex, secondLetterIndex)) {
      let newFirstIndex = firstLetterIndex + 1;
      let newSecondIndex = secondLetterIndex + 1;

      if (newFirstIndex % 5 === 0) {
        newFirstIndex -= 5;
      }

      if (newSecondIndex % 5 === 0) {
        newSecondIndex -= 5;
      }
      return grid[newFirstIndex] + grid[newSecondIndex];
    } else if (sameColumn(firstLetterIndex, secondLetterIndex)) {
      let newFirstIndex = firstLetterIndex + 5;
      let newSecondIndex = secondLetterIndex + 5;

      if (newFirstIndex >= 25) {
        newFirstIndex -= 25;
      }

      if (newSecondIndex >= 25) {
        newSecondIndex -= 25;
      }
      return grid[newFirstIndex] + grid[newSecondIndex];
    } else {
      const firstLetterRow = Math.floor(firstLetterIndex / 5);
      const firstLetterColumn = firstLetterIndex % 5;
      const secondLetterRow = Math.floor(secondLetterIndex / 5);
      const secondLetterColumn = secondLetterIndex % 5;
      return (
        grid[firstLetterRow * 5 + secondLetterColumn] +
        grid[secondLetterRow * 5 + firstLetterColumn]
      );
    }
  });

  return encoded.join('');
};

const decrypt = (input: string, KEY = 'liverpool'): string => {
  const pairs = input.match(/..?/g);

  const keyWithoutDuplicates = removeDuplicateCharacters(KEY);
  const alphabetWithoutKey = ALPHABET.split('')
    .filter((letter) => !KEY.includes(letter))
    .join('');
  const grid = (keyWithoutDuplicates + alphabetWithoutKey).split('');
  const decoded = pairs.map((pair) => {
    const [firstLetterIndex, secondLetterIndex] = findIndexes(grid, pair);
    if (sameRow(firstLetterIndex, secondLetterIndex)) {
      let newFirstIndex = firstLetterIndex - 1;
      let newSecondIndex = secondLetterIndex - 1;

      if (newFirstIndex % 5 === 4 || newFirstIndex === -1) {
        newFirstIndex += 5;
      }

      if (newSecondIndex % 5 === 4 || newSecondIndex === -1) {
        newSecondIndex += 5;
      }
      return grid[newFirstIndex] + grid[newSecondIndex];
    } else if (sameColumn(firstLetterIndex, secondLetterIndex)) {
      let newFirstIndex = firstLetterIndex - 5;
      let newSecondIndex = secondLetterIndex - 5;

      if (newFirstIndex < 0) {
        newFirstIndex += 25;
      }

      if (newSecondIndex < 0) {
        newSecondIndex += 25;
      }
      return grid[newFirstIndex] + grid[newSecondIndex];
    } else {
      const firstLetterRow = Math.floor(firstLetterIndex / 5);
      const firstLetterColumn = firstLetterIndex % 5;
      const secondLetterRow = Math.floor(secondLetterIndex / 5);
      const secondLetterColumn = secondLetterIndex % 5;
      return (
        grid[firstLetterRow * 5 + secondLetterColumn] +
        grid[secondLetterRow * 5 + firstLetterColumn]
      );
    }
  });

  return decoded.join('').replace(/[x]/g, '');
};

export default {
  id: 9,
  encrypt,
  decrypt,
  indata: [
    'The only way to prove that you are a good sport is to lose',
    'Age is no barrier. It is a limitation you put on your mind',
    'Baseball is the only field of endeavor where a person can succeed three times out of ten and be considered a good performer',
    'Make sure your worst enemy doesn’t live between your own two ears',
    'The more difficult the victory, the greater the happiness in winning',
  ].map((item) => item.toLowerCase().replace(/[^A-Za-z]/g, '')),
  information: [
    {
      html:
        'We have once again intercepted their phone communication, but have not heard anything we find fishy. The only thing we have heard is that they might be concerned for some sports game because they have been talking about "Fair play" in the match with Liverpool',
      level: 'Required',
    },
    {
      html: 'We have concluded that this is a Playfair cipher with the keyword "Liverpool"',
      level: 'Hard',
    },
  ],
};
