import { Artifact } from "./artifact";
import { Equipment } from "./equipment";
import { Set } from "./set";

export interface ListedHero {
    heroes: Hero[];
    totalCount: number;
    currentPage: number;
}

export interface Hero {
    code: string;
    name: string;
    grade: number;
    jobCode: string;
    attributeCode: string;
}

export interface BuildHero {
    code: string;
    name: string;
    grade: number;
    jobCode: string;
    attributeCode: string;
    level: number;
    skillsLevel: number;
    artifact: Artifact;
    artifactLevel: number;
    imprint: string;
    tags: string[];
    priority: number;
    awakening: number;
    buildStatus: string;
    // hasExclusiveEquipment?: boolean;
    // equipment: Equipment;
    // set: Set[];
}

export interface CompleteListedHero {
    heroList: CompleteHero[];
    isHeroYN: number;
    returnCode: number;
    returnMsg: string;
    world: string;
    hero: string;
    lang: string;
    totalCount: number;
    currentPage: number;
}

export interface CompleteHero {
    langCode?: any;
    worldCode?: any;
    heroCode: string;
    heroName: string;
    grade: number;
    jobCode: string;
    jobName?: any;
    attributeCode: string;
    attributeName?: any;
    dataDt?: any;
    rowNum: number;
    pageNo: number;
    rankingSeq: number;
    ranking: number;
    specificGravity: number;
}