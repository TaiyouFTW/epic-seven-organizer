import type { VercelRequest, VercelResponse } from '@vercel/node';
import request from 'request';
import { Hero } from './../src/app/_shared/interfaces/hero';

export default async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');

    let heroes = Array<Hero>();

    if (req.method === 'GET') {
        request(
            'https://epic7.smilegatemegaport.com/guide/catalyst/getHeroFirstSet',
            {
                method: 'POST',
                headers: {
                    "gc_currentPage": "13",
                    "gc_isPaging": "N",
                    "gc_lang": "en",
                    "gc_world": "world_global",
                    "gc_hero": "c4071",
                }
            }, (error, response, body) => {
                if (response.statusCode == 200) {
                    if (response.body.heroList && response.body.heroList.length > 0) {
                        for (let i = 0; i < response.body.heroList.length; i++) {
                            let hero = response.body.heroList[i];
                            heroes.push({
                                code: hero.heroCd,
                                name: hero.heroNm,
                                grade: hero.grade,
                                jobCode: fixJobCode(hero.jobCd),
                                attributeCode: fixAttributeCode(hero.attributeCd),
                            });
                        }
                    }
                    res.status(200).send(response.body);
                } else {
                    res.status(response.statusCode).send(error.message);
                }
            }
        );
    }
};

function fixJobCode(jobCode: string) {
    switch (jobCode) {
        case 'assassin':
            return 'thief';
        case 'manauser':
            return 'soul-weaver';
        default:
            return jobCode;
    }
}

function fixAttributeCode(attributeCode: string) {
    switch (attributeCode) {
        case 'wind':
            return 'earth';
        default:
            return attributeCode;
    }
}
