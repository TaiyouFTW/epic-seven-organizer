import type { VercelRequest, VercelResponse } from '@vercel/node';

export default (request: VercelRequest, response: VercelResponse) => {
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', '*');

    if (request.method === 'GET') {
        const heroes = getHeroes();
        response.status(200).send(heroes);
    }
};

async function getHeroes() {
    let myHeaders = new Headers();
    myHeaders.append('gc_currentPage', '0');
    myHeaders.append('gc_hero', 'c4071');
    myHeaders.append('gc_isPaging', 'N');
    myHeaders.append('gc_lang', 'en');
    myHeaders.append('gc_world', 'world_global');

    let myInit = {
        method: 'POST',
        headers: myHeaders
    };
    return await fetch('http://epic7.smilegatemegaport.com/guide/catalyst/getHeroFirstSet', myInit).then(response => response.json());
}
