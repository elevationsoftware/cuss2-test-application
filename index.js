import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import path  from 'path';
const app = express();
const port = process.env.PORT || 3001;

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function setLongTermCache(res) {
  res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  res.setHeader("Cache-Control", "public, max-age=2592000");
}

app
  .use(compression())
  .use(bodyParser.json())
  .use(express.static(path.join(__dirname, 'dist', 'cuss2-example-angular'), {
    setHeaders(res, path) {
      if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json|woff|woff2)$/)) {
        setLongTermCache(res);
      }
    }
  })
  )
  .use((req, res, next) => {
    if (path.extname(req.path).length > 0) {
      next();
    } else {
      res.write(fs.readFileSync(path.join(__dirname, 'dist', 'cuss2-example-angular', 'index.html')));
      res.end()
    }
  })
  .listen(port);
console.info('[INFO] [${new Date().toLocaleString()}] Running on port: ' + port);
