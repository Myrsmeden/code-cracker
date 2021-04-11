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
        current_chapter.push(...allTexts);
      }
    }
  }
});

const decrypt = (code) => {
  return  code.split(' ').map((key) => {
    const [chapter, line, position] = key.split(':');
    return chapters[chapter - 1][line - 1].split(' ')[position - 1];
  }).join(' ');
};

console.log(decrypt('5:36:6 2:10:15 2:13:18 3:4:36 1:1:8 22:13:45 1:1:4 3:4:36 4:31:11'))
