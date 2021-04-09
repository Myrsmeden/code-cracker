export default {
  id: 2,
  encrypt: (unencrypted: string): string => Buffer.from(unencrypted).toString('base64'),
  decrypt: (encrypted: string): string => Buffer.from(encrypted, 'base64').toString('utf8'),
  indata: [
    'You’re braver than you believe, stronger than you seem, and smarter than you think.',
    'Who in the world am I? Ah, that’s the great puzzle.',
    'You’re mad, bonkers, completely off your head. But I’ll tell you a secret. All the best people are.',
    'Age is foolish and forgetful when it underestimates youth',
    "Mama always said life was like a box of chocolates. You never know what you're gonna get",
  ],
  information: [
    {
      html:
        "The code is made with only lowercase letter, uppercase letters, numbers and some = signs. There are no spaces between words or anything that looks obviously like a word, so it doesn’t seem that we would be able to replace letters and find the solution. But we've seen this encoding before, around the web.",
      level: 'Hard',
    },
    {
      html:
        'A closer look reveals that this encoding looks really similar to something that appears in a lot of long URLs. Our analyst says that the encoding is something called base64, and that it is used to convert any text (or information of any kind) into just letters and numbers.',
      level: 'Medium',
    },
  ],
};
