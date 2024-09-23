export async function POST(request) {
    const json = await getHeroes();

    return new Response(JSON.stringify(json), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function getHeroes() {
    const res = await fetch('https://epic7.game.onstove.com/guide/catalyst/getHeroFirstSet', {
        method: 'POST', headers: {
            "Access-Control-Allow-Origin": "*",
            "Accept": "*/*",
            "gc_currentPage": "0",
            "gc_isPaging": "N",
            "gc_lang": "en",
            "gc_world": "world_global",
            "gc_hero": "c4071"
        },
    });
    return res.json();
}