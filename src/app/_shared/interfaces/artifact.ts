export interface ListedArtifact {
    artifacts: Artifact[];
    totalCount: number;
    currentPage: number;
}

export interface Artifact {
    artifactCode: string;
    artifactName: string;
    jobCode: string;
    grade: number;
}

export interface CompleteListedArtifact {
    artifact: string;
    returnCode: number;
    returnMsg: string;
    world: string;
    artifactList: CompleteArtifact[];
    lang: string;
    totalCount: number;
    currentPage: number;
    isExist: number;
}

export interface CompleteArtifact {
    langCode?: any;
    artifactCode: string;
    artifactName: string;
    jobCode: string;
    grade: number;
    abilityAttack: number;
    abilityDefense: number;
    enhanceAbilityAttack: number;
    enhanceAbilityDefense: number;
    rowNum: number;
    pageNo: number;
    rankingSeq: number;
    ranking: number;
    specificGravity: number;
}