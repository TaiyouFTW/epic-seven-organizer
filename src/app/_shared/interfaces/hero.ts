import { Artifact } from "./artifact";

export interface Hero {
    id: string | null;
    name: string;
    level: number | null;
    artifact: Artifact | null;
    status: string | null;
    tags: string[];
    code: string;
    class: string;
    element: string;
}
