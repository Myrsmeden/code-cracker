import task from './hex';

test('can encrypt', () => {
  expect(task.encrypt('254')).toBe('fe');
});

test('can decrypt', () => {
  expect(task.decrypt('fe')).toBe('254');
});

test('can reverse', () => {
  const encrypted = task.indata.map(task.encrypt);
  const decrypted = encrypted.map(task.decrypt);
  decrypted.forEach((input) => expect(task.indata).toContain(input));
});
