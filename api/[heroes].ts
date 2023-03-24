import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
    req: VercelRequest,
    res: VercelResponse,
) {
    let heroes = new Request('https://epic7.smilegatemegaport.com/guide/catalyst/getHeroFirstSet', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'gc_currentPage': '0',
            'gc_isPaging': 'N',
            'gc_lang': 'en',
            'gc_world': 'world_global',
            'gc_hero': 'c4071'
        }
    });
    return res.end(heroes);
    //   const { heroes } = request.query;
    //   return response.end(`Hello ${heroes}!`);
}