import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Artifact } from '../interfaces/artifact';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  private _tags: string[] = ['all', 'pvp', 'pve', 'wyvern', 'golem', 'banshee', 'azimanak', 'caides', 'expedition', 'lab'];
  private _status: string[] = ['Worst', 'Need Fix', 'Ok', 'Best'];
  private _array30: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  private _imprints: string[] = ['D', 'C', 'B', 'A', 'S', 'SS', 'SSS'];
  private _roles: string[] = ['warrior', 'knight', 'thief', 'ranger', 'mage', 'soul-weaver'];

  constructor() { }

  createUuid = () => uuid();

  public get tags(): string[] {
    return this._tags;
  }

  public get status(): string[] {
    return this._status;
  }

  public get imprints(): string[] {
    return this._imprints;
  }

  public get roles(): string[] {
    return this._roles;
  }

  public get fromZeroToThirty(): number[] {
    return this._array30;
  }

  removeOneItem<Type>(array: Type[], toRemove: Type) {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  filterByName<Type extends Hero | Artifact>(value: string, list: Type[]) {
    const filterValue = value.toLowerCase();

    return list.filter(item => item.name.toLowerCase().includes(filterValue));
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
