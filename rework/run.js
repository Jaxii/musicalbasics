require = require('esm')(module, {
    mode: 'all',
    cjs: true
});

module.exports = require('./src/app.js');