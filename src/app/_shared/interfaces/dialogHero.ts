import { Artifact } from "./artifact";
import { BuildHero, Hero } from "./hero";

export interface DialogHero {
    heroes: Hero[];
    artifacts: Artifact[];
    hero?: BuildHero;
}