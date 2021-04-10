import task from './book'

test('can encrypt', () => {
  expect(task.encrypt('Skåne hoppade')).toBe('2:4:18 4:4:2');
});

test('can decrypt', () => {
  expect(task.decrypt('4:8:3 1:1:10')).toBe('gamla himmelen');
});

test('can reverse', () => {
  const encrypted = task.indata.map(task.encrypt);
  const decrypted = encrypted.map(task.decrypt);
  decrypted.forEach((input) => expect(task.indata).toContain(input));
});
