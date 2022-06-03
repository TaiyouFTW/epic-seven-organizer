import type { VercelRequest, VercelResponse } from '@vercel/node';
import request from 'request';

export default async (req: VercelRequest, res: VercelResponse) => {
    const { name } = req.query;
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const data = request('https://api.hgbrasil.com/weather??woeid=449648');

    res.status(200).send(data);
};