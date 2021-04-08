import task from './dictionary';

test('can encrypt', () => {
  expect(task.encrypt('we are cracking some codes')).toBe('16 17 24144 109 4824');
});

test('can decrypt', () => {
  expect(task.decrypt('16 17 24144 109 4824')).toBe('we are cracking some codes');
});

test('can reverse', () => {
  const encrypted = task.indata.map(task.encrypt);
  const decrypted = encrypted.map(task.decrypt);
  decrypted.forEach((input) => expect(task.indata).toContain(input));
});
