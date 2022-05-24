const express = require('express');
const next = require('next');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { newWord, lastWord } = require('../database/mongoose');

app.prepare().then(() => {
    const server = express();

    server.get('/a', (req, res) => {
        lastWord().then((result) => {
            console.log(result[0].word);
            res.json({ word: result[0].word });
        });
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
