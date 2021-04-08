import cors from 'cors';
import express from 'express';
import path from 'path';
import proxy from 'express-http-proxy';

const app = express();
const { PORT = 4001 } = process.env;

app.use(
  '/.netlify',
  proxy('http://localhost:4006', {
    proxyReqPathResolver: function (req) {
      return `/.netlify${req.url}`;
    },
  })
);

app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
