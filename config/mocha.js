'use strict';

module.exports = {
    env: {
        mocha: true
    },
    plugins: [
        'mocha-only'
    ],
    rules: {
        'mocha-only/mocha-only': 'error'
    }
};
