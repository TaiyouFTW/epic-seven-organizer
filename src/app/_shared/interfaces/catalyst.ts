export interface ListedCatalyst {
    catalysts: Catalyst[];
    totalCount: number;
    currentPage: number;
}

export interface Catalyst {
    catalystCode: string;
    catalystName: string;
    useType: number;
}

export interface CompleteListedCatalyst {
    returnCode: number;
    returnMsg: string;
    catalystList: CompleteCatalyst[];
    world: string;
    lang: string;
    totalCount: number;
    currentPage: number;
}

export interface CompleteCatalyst {
    catalystCode: string;
    langCode: string;
    catalystName: string;
    useType: number;
    catalystType: string;
}