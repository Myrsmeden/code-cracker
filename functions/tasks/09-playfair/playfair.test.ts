import task from './playfair';

test('can encrypt', () => {
  expect(task.encrypt('I will be at the clock in five minutes', 'instructables')).toBe(
    'nvruulfusyrgduaqumnsesikknicigas'
  );

  expect(task.encrypt('Age is no barrier')).toBe('gqrvtqaccvlvrl');
});

test('can decrypt', () => {
  expect(task.decrypt('nvruulfusyrgduaqumnsesikknicigas', 'instructables')).toBe(
    'iwillbeattheclockinfiveminutes'
  );
  expect(task.decrypt('gqrvtqaccvlvrl')).toBe('ageisnobarrier');
});

test('can reverse', () => {
  const encrypted = task.indata.map((text) => task.encrypt(text));
  const decrypted = encrypted.map((text) => task.decrypt(text));
  decrypted.forEach((input) => expect(task.indata).toContain(input));
});
