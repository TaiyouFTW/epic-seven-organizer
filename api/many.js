const app = require('express')();
const request = require('request');

app.get('/', (req, res) => {
    request({ uri: 'https://api.hgbrasil.com/weather??woeid=449648' }).pipe(res);
});

module.exports = app;