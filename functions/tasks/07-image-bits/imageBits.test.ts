import task from './imageBits';

test('can encrypt', () => {
  expect(
    task.encrypt(
      'The larger the cover message (in binary data, the number of bits) relative to the hidden message, the easier it is to hide the hidden message (as an analogy, the larger the "haystack", the easier it is to hide a "needle"). So digital pictures, which contain much data, are sometimes used to hide messages on the Internet and on other digital communication media. It is not clear how common this practice actually is.'
    )
  ).toBe('https://code-cracker.netlify.app/bi_dog.png');
});
