const express = require('express');
const path = require('path');
const fs = require('fs');
const vueServerRenderer = require('vue-server-renderer');
const setupDevServer = require('./config/setup-dev-server');
const isProduction = process.env.NODE_ENV === 'production';

const port = 3000;
const app = express();

const createRenderer = (bundle) =>
    vueServerRenderer.createBundleRenderer(bundle, {
        runInNewContext: false,
        template: isProduction ? fs.readFileSync(path.resolve(__dirname, 'public/index.html'), 'utf-8') : fs.readFileSync(path.resolve(__dirname, 'dev.html'), 'utf-8')
    });
let renderer;

// you may want to serve static files with nginx or CDN in production
app.use('/public', express.static(path.resolve(__dirname, './public')));

if (process.env.NODE_ENV === 'development') {
    setupDevServer(app, (serverBundle) => {
        renderer = createRenderer(serverBundle);
    });
} else {
    renderer = createRenderer(require('./public/vue-ssr-server-bundle.json'));
}

app.get("*", async (req, res) => {
    const context = {
        url: req.params['0'] || '/',
        state: {}
    };
    let html;

    try {
        html = await renderer.renderToString(context);
    } catch (error) {
        if (error.code === 404) {
            return res.status(404).send('404 | Page Not Found');
        }
        return res.status(500).send('500 | Internal Server Error', error);
    }

    res.end(html);
});

app.listen(port, () => console.log(`Listening on: ${port}`));
