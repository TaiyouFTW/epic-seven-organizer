import type { VercelRequest, VercelResponse } from '@vercel/node';
import request from 'request';

export default async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'GET') {
        request(
            'https://epic7.smilegatemegaport.com/guide/wearingStatus/getArtifactList',
            {
                method: 'POST',
                headers: {
                    "gc_currentPage": "1",
                    "gc_isPaging": "N",
                    "gc_lang": "en",
                    "gc_world": "world_global",
                    "gc_artifact": "ef320"
                }
            }, (error, response, body) => {
                if (response.statusCode == 200) {
                    res.status(200).send(response.body);
                } else {
                    res.status(response.statusCode).send(error.message);
                }
            }
        );
    }
};