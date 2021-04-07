export default {
  id: 1,
  encrypt: (unencrypted: string): string => parseInt(unencrypted, 10).toString(16),
  decrypt: (encrypted: string): string => parseInt(encrypted, 16).toString(10),
  indata: [
    '1044942',
    '2343432205',
    '3221229823',
    '14600926',
    '13286381',
    '16435934',
    '1027565',
    '712173',
  ],
};
