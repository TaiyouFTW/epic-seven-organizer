import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (request: VercelRequest, response: VercelResponse) => {
    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "gc_currentPage": "13",
        "gc_isPaging": "N",
        "gc_lang": "en",
        "gc_world": "world_global",
        "gc_hero": "c4071",
    }

    const res = await fetch('https://api.hgbrasil.com/weather??woeid=449648');

    const data = await res.json();
    return response.json(data);
};
