export default {
  id: 1,
  encrypt: (unencrypted: string): string => parseInt(unencrypted, 10).toString(16),
  decrypt: (encrypted: string): string => parseInt(encrypted, 16).toString(10),
  indata: ['1044942', '2343432205', '3221229823'],
  information: [
    {
      html:
        'After intercepting a few messages, it almost looks like the codes are numbers - but with letters in them. However, we have not seen the presense of all letters. How can we convert them to normal ones?',
      level: 'Hard',
    },
    {
      html: 'By looking at other codes, we have concluded that it might be hexadecimal numbers. ',
      level: 'Medium',
    },
  ],
};
