import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (request: VercelRequest, response: VercelResponse) => {
    const { name } = request.query;
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', '*');

    const res = await fetch('https://api.hgbrasil.com/weather??woeid=449648');

    const data = await res.json();
    return response.status(200).json(data);

    response.status(200).send(`Hello ${name}!`);
};