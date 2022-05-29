import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (request: VercelRequest, response: VercelResponse) => {
    const res = await fetch('http://epic7.smilegatemegaport.com/guide/catalyst/getHeroFirstSet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'gc_currentPage': '0',
            'gc_hero': 'c4071',
            'gc_isPaging': 'N',
            'gc_lang': 'en',
            'gc_world': 'world_global'
        },
    });

    const data = await res.json();
    return response.status(200).json({ data });
};
