import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  private today: Date = new Date();

  private tags: string[] = ['PVP', 'PVE', 'Wyvern', 'Golem', 'Banshee', 'Azimanak', 'Caides', 'Expedition'];
  private buildStatus: string[] = ['Not builded', 'Need fix', 'Ok', 'Builded', 'Best build'];

  constructor(private configService: ConfigService) { }

  public get getTags(): string[] {
    return this.tags;
  }

  public get getBuildStatus(): string[] {
    return this.buildStatus;
  }

  fixJobClasses(jobCode: string) {
    switch (jobCode) {
      case 'assassin':
        return 'thief';
      case 'manauser':
        return 'soul-weaver';
      default:
        return jobCode;
    }
  }

  fixElements(elementCode: string) {
    switch (elementCode) {
      case 'wind':
        return 'earth';
      default:
        return elementCode;
    }
  }

  fixJobCode(jobCode: string) {
    switch (jobCode) {
      case 'NN':
        return 'GENERIC';
      case 'soul-weaver':
        return 'SOUL WEAVER';
      case undefined:
      case null:
        return '';
      default:
        return jobCode.toUpperCase();
    }
  }

  canUpdate() {
    let lastUpdate = new Date(this.configService.currentCanUpdateByDateValue);
    let todayAux = new Date();
    lastUpdate.setHours(0, 0, 0, 0);
    todayAux.setHours(0, 0, 0, 0);
    if (this.today.getDay() == 4 && this.today.getUTCHours() >= 9 && todayAux > lastUpdate) {
      return true;
    } else {
      return false;
    }
  }
}
