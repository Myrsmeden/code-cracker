const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const filedata = fs.readFileSync(require.resolve('../public/nils-holgersson.txt'), 'utf-8');

const dom = new JSDOM(filedata);
const root = dom.window.document;
const content = root.querySelector('.generated-style');
const elements = Array.from(content.childNodes);

const chapters = [];
let current_chapter = null;
let thing = true;
elements.forEach((element) => {
  if (element.tagName) {
    if (element.tagName.startsWith('H')) {
      if (element.tagName.endsWith('H1')) {
        const id = element.attributes.getNamedItem('id');
        if (id && id.value.startsWith('toc-anchor')) {
          current_chapter = [];
          chapters.push(current_chapter);
        }
      }
    } else {
      const allTexts = Array.from(element.childNodes).map((node) =>
        node.innerHTML.replace(/<br>/g, ' ').trim()
      );

      if (allTexts.length) {
        current_chapter.push(allTexts.join(' '));
      }
    }
  }
});

fs.writeFileSync('book.txt', JSON.stringify(chapters));
