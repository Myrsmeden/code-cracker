const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
const INSERT_CHAR = 'X';
const POEM = 'Tyger Tyger burning bright In the forests of the night What immortal hand or eye Could frame thy fearful symmetry In what distant deeps or skies Burnt the fire of thine eyes On what wings dare he aspire What the hand dare seize the fire'
  .toUpperCase()
  .split(' ');
const KEY_WORDS = 'immortal symmetry distant fearful forests'.toUpperCase();
const keyPositions = KEY_WORDS.split(' ').map((word) => POEM.indexOf(word));
const keyLetters = keyPositions.map((position) => ALPHABET[position]).join('');

let transpositionKeyMutable = KEY_WORDS.split('');
let currentNumber = 0;
for (let letterIndex = 0; letterIndex < ALPHABET.length; letterIndex++) {
  const currentLetter = ALPHABET[letterIndex];
  transpositionKeyMutable = transpositionKeyMutable.map((character) => {
    if (character === currentLetter) {
      currentNumber += 1;
      return currentNumber.toString();
    }

    return character;
  });
}
const transpositionKey = transpositionKeyMutable.filter((item) => item !== ' ').map(Number);

const encrypt = (input: string): string => {
  const messageWithoutSpaces = input.split('').filter((item) => item.trim().length > 0);
  const numberOfKeys = transpositionKey.length;
  let decoded = '';
  for (let i = 1; i <= transpositionKey.length; i++) {
    const numberColumnPosition = transpositionKey.indexOf(i);
    for (
      let row = 0;
      row < Math.ceil(messageWithoutSpaces.length / transpositionKey.length);
      row++
    ) {
      if (numberColumnPosition + row * numberOfKeys < messageWithoutSpaces.length) {
        decoded += messageWithoutSpaces[numberColumnPosition + row * numberOfKeys];
      } else {
        decoded += INSERT_CHAR;
      }
    }
  }

  const reGrouper = new RegExp(`.{1,${keyLetters.length}}`, 'g');
  return keyLetters + ' ' + decoded.match(reGrouper).join(' ');
};

const decrypt = (input: string): string => {
  const [keyLetters, ...encodedMessage] = input.split(' ');
  const wordPositions = keyLetters.split('').map((letter) => ALPHABET.indexOf(letter));
  const keyWords = wordPositions.map((position) => POEM[position]);
  let currentNumber = 0;
  let transpositionKeyMutable = keyWords.join('').split('');
  for (let letterIndex = 0; letterIndex < ALPHABET.length; letterIndex++) {
    const currentLetter = ALPHABET[letterIndex];
    transpositionKeyMutable = transpositionKeyMutable.map((character) => {
      if (character === currentLetter) {
        currentNumber += 1;
        return currentNumber.toString();
      }

      return character;
    });
  }
  const result = new Array(encodedMessage.length);
  const transpositionKey = transpositionKeyMutable.filter((item) => item !== ' ').map(Number);

  const columnHeight = encodedMessage.join('').length / transpositionKey.length;
  const reGrouper = new RegExp(`.{1,${columnHeight}}`, 'g');
  const columns = encodedMessage.join('').match(reGrouper);
  columns.forEach((column, index) => {
    const position = transpositionKey.indexOf(index + 1);
    column.split('').forEach((letter, letterPosition) => {
      result[position + letterPosition * transpositionKey.length] = letter;
    });
  });
  const replaceInserted = new RegExp(`${INSERT_CHAR}+$`, 'g');
  return result.join('').replace(replaceInserted, '');
};

export default {
  id: 8,
  encrypt,
  decrypt,
  indata: [
    'Poetryisaformofliteraturethatusesaestheticandoftenrhythmicqualitiesoflanguagesuchasphonaestheticssoundsymbolismandmetretoevokemeaningsinadditiontoorinplaceoftheprosaicostensiblemeaning',
    'EarlypoemsintheEurasiancontinentevolvedfromfolksongssuchastheChineseShijingorfromaneedtoretelloralepicsaswiththeSanskritVedastheZoroastrianGathasandtheHomericepicstheIliadandtheOdyssey',
  ].map((item) => item.toUpperCase()),
  information: [
    {
      html:
        'This looks a bit like the third task, but we cannot see any particular pattern in the code except that each message starts with "LTWSG". When listening to phone calls, we have heard a lot of mentions of William Blake, and in particular the poem The Tyger',
      level: 'Required',
    },
    {
      html:
        'After doing some investigation we have found the poem at <a href="https://www.poetryfoundation.org/poems/43687/the-tyger" target="_blank">this URL</a>. We have also searched for terms like "poem" and "code" and found <a href="https://en.wikipedia.org/wiki/Poem_code" target="_blank">this Wikipedia article"</a>. We assume that they have removed punctuation from the poem so that there are only letters and spaces left, but no line breaks.',
      level: 'Hard',
    },
    {
      html:
        'The starting sequence "LTWSG" must be the reference to the key words, and according to the Wikipedia article they should be "immortal symmetry distant fearful forests" in capital letters.',
      level: 'Medium',
    },
  ],
};
