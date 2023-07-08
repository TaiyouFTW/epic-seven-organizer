import { Injectable, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  tags = signal<string[]>(['pvp', 'pve', 'wyvern', 'golem', 'banshee', 'azimanak', 'caides', 'expedition', 'lab'])
  status = signal<string[]>(['Worst', 'Need Fix', 'Ok', 'Best']);
  thirtyNumbers = signal<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
  imprints = signal<string[]>(['D', 'C', 'B', 'A', 'S', 'SS', 'SSS']);
  roles = signal<string[]>(['warrior', 'knight', 'thief', 'ranger', 'mage', 'soul-weaver']);
  elements = signal<string[]>(['fire', 'ice', 'earth', 'light', 'dark']);

  constructor() { }

  createUuid = () => uuid();

  removeOneItem<Type>(array: Type[], toRemove: Type) {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  changeElementName(element: string) {
    switch (element) {
      case 'wind':
        return 'earth';
      default:
        return element;
    }
  }

  changeClassName(className: string) {
    switch (className) {
      case '':
      case 'NN':
        return 'GENERIC';
      case 'manauser':
        return 'SOUL WEAVER';
      case 'assassin':
        return 'THIEF';
      case undefined:
      case null:
        return '';
      default:
        return className.toUpperCase();
    }
  }
}
