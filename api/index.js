const app = require('express')();
const request = require('request');

app.get('/api', (req, res) => {
    const path = `/api/item/${v4()}`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
    const { slug } = req.params;
    res.end(`Item: ${slug}`);
});

app.get('/api/many', (req, res) => {
    request({ uri: 'https://api.hgbrasil.com/weather??woeid=449648' }).pipe(res);
});

module.exports = app;