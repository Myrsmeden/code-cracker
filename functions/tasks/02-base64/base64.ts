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
  information: [],
};
