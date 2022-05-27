const next = require('next');
const express = require('express');
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

var SimpleCrypto = require('simple-crypto-js').default;
const { WORD_ENCRYPTION_KEY, WORDS_API_KEY } = require('../secrets.json');
const simpleCrypto = new SimpleCrypto(WORD_ENCRYPTION_KEY);

var cron = require('node-cron');

const { newWord, lastWord } = require('../database/mongoose');

const getNewWordFromAPI = function () {
    const url =
        'https://wordsapiv1.p.rapidapi.com/words/?random=true&limit=1&letters=5&frequencyMin=5&frequencyMax=6.5';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
            'X-RapidAPI-Key': WORDS_API_KEY,
        },
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
            console.log(json.word.toUpperCase());
            newWord(json.word.toUpperCase());
        })
        .catch((e) => {
            console.log('Error saving in the DB', e);
        });
};

app.prepare().then(() => {
    const server = express();

    getNewWordFromAPI();

    cron.schedule('0 * * * *', () => {
        getNewWordFromAPI();
        console.log('New Word!');
    });

    server.get('/api/current_word', (req, res) => {
        lastWord().then((result) => {
            console.log(result[0].word);
            const cipherText = simpleCrypto.encrypt(result[0].word);
            res.json({ word: cipherText });
        });
    });

    server.get('/api/valid_word/:word', (req, res) => {
        let word = req.params.word;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
                'X-RapidAPI-Key': WORDS_API_KEY,
            },
        };

        fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, options)
            .then((response) => response.json())
            .then((response) => {
                if (response.success == false) {
                    res.json({ valid: false });
                } else {
                    res.json({ valid: true });
                }
            })
            .catch((err) => console.error(err));
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
