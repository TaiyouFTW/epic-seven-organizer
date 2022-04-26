import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

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
}
