import task from './base64';

test('can encrypt', () => {
  expect(task.encrypt('Hello World')).toBe('SGVsbG8gV29ybGQ=');
});

test('can decrypt', () => {
  expect(task.decrypt('SGVsbG8gV29ybGQ=')).toBe('Hello World');
});

test('can reverse', () => {
  const encrypted = task.indata.map(task.encrypt);
  const decrypted = encrypted.map(task.decrypt);
  decrypted.forEach((input) => expect(task.indata).toContain(input));
});
