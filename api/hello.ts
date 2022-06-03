import type { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {
    const request = new Request('https://api.hgbrasil.com/weather??woeid=449648');
    const url = request.url;
    fetch(request)
        .then(response => response.json())
    // request({ uri: 'https://api.hgbrasil.com/weather??woeid=449648'});
};