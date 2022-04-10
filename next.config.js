/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        mongodburl: 'mongodb://localhost:27017/wordle',
    },
};

const intercept = require('intercept-stdout');

// safely ignore recoil stdout warning messages
function interceptStdout(text) {
    if (text.includes('Duplicate atom key')) {
        return '';
    }
    return text;
}

// Intercept in dev and prod
intercept(interceptStdout);

module.exports = nextConfig;
