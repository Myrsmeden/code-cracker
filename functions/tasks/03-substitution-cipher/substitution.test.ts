import task from './substitution';

test('can encrypt', () => {
  expect(task.encrypt('hej')).toBe('khm');
});

test('can decrypt', () => {
  expect(task.decrypt('khm')).toBe('hej');
});

test('can reverse', () => {
  const encrypted = task.indata.map(task.encrypt);
  const decrypted = encrypted.map(task.decrypt);
  decrypted.forEach((input) => expect(task.indata).toContain(input));
});
