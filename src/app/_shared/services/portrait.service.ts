import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class PortraitService {

  private _heroUrl: string = 'https://static.smilegatemegaport.com/event/live/epic7/guide/images/hero/';
  private _artifactUrl: string = 'https://static.smilegatemegaport.com/event/live/epic7/guide/wearingStatus/images/artifact/';
  private _unknownHeroPortrait = './assets/images/unknown.png';

  constructor() { }

  hero(code: string) {
    if (code == null || code.length == 0) return this._unknownHeroPortrait;

    return `${this._heroUrl}${code}_s.png`;
  }

  artifact(code: string) {
    if (code == null || code.length == 0) return '';

    return `${this._artifactUrl}${code}_ico.png`;
  }

  error(hero: Hero) {
    let code = 'npc0000';
    if (hero != undefined && Object.keys(hero).length > 0 && hero.code.length > 0) {
      code = hero.code;
    }

    return `https://www.e7vau.lt/static/game/face/${code}_s.png`;
  }
}
