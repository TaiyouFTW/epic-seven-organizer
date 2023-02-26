import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { Artifact } from '../interfaces/artifact';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  createUuid = () => uuid();

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
        return 'GENERIC';
      case 'manauser':
        return 'SOUL WEAVER';
      case undefined:
      case null:
        return '';
      default:
        return className.toUpperCase();
    }
  }
}
