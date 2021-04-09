import task from './imageBytes';

test('can encrypt', () => {
  expect(
    task.encrypt(
      'The word steganography comes from Greek steganographia, which combines the words steganós, meaning "covered or concealed", and -graphia meaning "writing".'
    )
  ).toBe('https://code-cracker.netlify.app/Bdog.png');
});
