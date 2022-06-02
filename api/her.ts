import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async (request: VercelRequest, response: VercelResponse) => {
    request({})
    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "gc_currentPage": "13",
        "gc_isPaging": "N",
        "gc_lang": "en",
        "gc_world": "world_global",
        "gc_hero": "c4071",
    }

    fetch('https://api.hgbrasil.com/weather??woeid=449648')
        .then((res) => {
            return res.json()
        });
};