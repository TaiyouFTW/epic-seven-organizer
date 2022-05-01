import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  private today: Date = new Date();

  constructor(private configService: ConfigService) { }

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
    if (this.today.getDay() == 4 && this.today.getUTCHours() >= 9 && this.configService.currentCanUpdateValue) {
      return true;
    } else {
      return false;
    }
  }
}
