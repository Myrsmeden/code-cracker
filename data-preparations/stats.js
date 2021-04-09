const fs = require('fs');
const csv = require('csv-parser');

const common = [];
fs.createReadStream(require.resolve('../public/stats.txt'))
  .pipe(
    csv({
      headers: ['word', 'classification', 'baseform', 'status', 'freq_abs', 'freq_rel'],
      separator: '\t',
      escape: '',
    })
  )
  .on('data', (data) => common.push(data.word.toLowerCase()))
  .on('end', () => {
    fs.writeFileSync('fixed_stats.json', JSON.stringify(common));
  });
