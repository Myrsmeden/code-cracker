import stats from './stats';
import { Level } from '../../../src/shared/Task';
/**
 * Rules:
   - The dictionary's first 100,000 words are used.
   - All input is converted to lower case.
   - All input is encoded in UTF-8.
   - Numbers in the input is bad.
   - Punctuation can be ignored.
   - Uncommon words (words not in the dictionary) are left unchanged.
 */

const encrypt = (input: string) => {
  let encrypted_text = '';
  const words = input.split(/[\s.:,;\"]+/);
  words.forEach((word: string) => {
    if (word.trim() === '') {
      // Do nothing
      return;
    }

    if (!isNaN(+word)) {
      // Skipping number
      return;
    }

    const index = stats.findIndex((item) => item === word);

    if (index > -1) {
      encrypted_text += (index + 1).toString();
    } else {
      encrypted_text += word;
    }

    encrypted_text += ' ';
  });

  return encrypted_text.trim();
};

const decrypt = (input: string): string => {
  let decrypted_text = '';

  const words = input.split(/\s+/);
  words.forEach((word) => {
    if (!isNaN(+word) && stats[Number(word) - 1]) {
      decrypted_text += stats[Number(word) - 1];
    } else {
      decrypted_text += word;
    }

    decrypted_text += ' ';
  });

  return decrypted_text.trim();
};

export default {
  id: 4,
  encrypt,
  decrypt,
  indata: [
    'we interrupt this program to annoy you and make things generally more irritating',
    'the medicine education wine public order irrigation roads the fresh water system and public health what have the romans ever done for us',
    'there are a great many people in the country today who through no fault of their own are sane',
    'we are the knights who say ni',
    'it is just a flesh wound',
    'are you suggesting that coconuts migrate',
    'and now for something completely different',
  ],
  information: [
    {
      html:
        'We have successfully intercepted a text message with the following information: <a href="/stats.txt" target="_new">stats.txt</a>',
      level: Level.Required,
    },
  ],
};
