import type { VercelRequest, VercelResponse } from '@vercel/node';
import request from 'request';

export default async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const data = request('https://epic7.smilegatemegaport.com/guide/catalyst/getHeroFirstSet',
        {
            method: 'POST',
            headers: {
                "gc_currentPage": "13",
                "gc_isPaging": "N",
                "gc_lang": "en",
                "gc_world": "world_global",
                "gc_hero": "c4071",
            }
        });

    res.status(200).send(data);
};