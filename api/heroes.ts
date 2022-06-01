import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async (request: VercelRequest, response: VercelResponse) => {
    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "gc_currentPage": "13",
        "gc_isPaging": "N",
        "gc_lang": "en",
        "gc_world": "world_global",
        "gc_hero": "c4071"
    }

    return response.end(fetch("http://epic7.smilegatemegaport.com/guide/catalyst/getHeroFirstSet", {
        method: "POST",
        headers: headersList
    }).then(function (response) {
        return response.json();
    }));
};
