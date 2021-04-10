import task from './book'

test('can encrypt', () => {
  expect(task.encrypt('Skåne hoppade')).toBe('2:4:18 4:4:2');
});

test('can decrypt', () => {
  expect(task.decrypt('4:8:3 1:1:10')).toBe('gamla himmelen');
  expect(task.decrypt('5:27:9 2:9:15 2:12:18 3:3:36 1:1:8 22:12:45 1:1:4 3:3:36 4:27:11')).toBe('Ni kan väl inte se någonting som inte finns')
});

test('can reverse', () => {
  const encrypted = task.indata.map(task.encrypt);
  const decrypted = encrypted.map(task.decrypt);
  decrypted.forEach((input) => expect(task.indata).toContain(input));
});
