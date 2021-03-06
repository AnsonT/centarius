import express from 'express';
import { render } from 'centarius/server';

import routes from './routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    if (req.url.match(/.map$/)) return;

    try {
      const html = await render({
        req,
        res,
        assets,
        routes,
        // Anything else you add here will be made available
        // within getInitialProps(ctx)
        // e.g a redux store...
        customThing: 'thing',
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
