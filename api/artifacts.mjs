export async function POST(request) {
    const json = await getArtifacts();

    return new Response(JSON.stringify(json), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

async function getArtifacts() {
    const res = await fetch('https://epic7.game.onstove.com/guide/wearingStatus/getArtifactList', {
        method: 'POST', headers: {
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'gc_currentPage': 0,
            'gc_isPaging': 'N',
            'gc_lang': 'en',
            'gc_world': 'world_global',
            'gc_artifact': 'ef320'
        },
    });
    return res.json();
}