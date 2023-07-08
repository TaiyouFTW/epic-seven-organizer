import { Injectable, computed, effect, signal } from '@angular/core';
import { Hero } from '../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroPoolService {

  private _list = signal<Hero[]>(new Array<Hero>());
  heroes = computed(() => this._filter());
  filterByTag = signal<string>('');
  filterByRole = signal<string[]>([]);
  filterByElement = signal<string[]>([]);

  constructor() {
    let fromStorage = localStorage.getItem('e7OrganizerMyHeroes');

    this._list.set(fromStorage && fromStorage.length > 0 ? JSON.parse(fromStorage) : []);
    effect(() => {
      localStorage.setItem('e7OrganizerMyHeroes', JSON.stringify(this._list()));
    });
  }

  add(hero: Hero) {
    this._list.mutate(heroes => heroes.push(hero));
  }

  update(hero: Hero) {
    this._list.update(heroes => heroes.map(value => value.id == hero.id ? hero : value));
  }

  find(hero: Hero) {
    return this._list().find(x => x.id == hero.id);
  }

  remove(id: string) {
    let index = this._list().findIndex(hero => hero.id == id);
    if (index != -1) {
      this._list.mutate(heroes => heroes.splice(index, 1));
    }
  }

  sort() {
    this._list.mutate(heroes => heroes.sort((a, b) => {
      if (a.priority != null && b.priority != null) {
        return a.priority - b.priority;
      }
      return 0;
    }))
  }

  private _filter() {
    let filtered = this._list();
    filtered = this._filterElements(filtered);
    filtered = this._filterRoles(filtered);
    if (this.filterByTag() != '') {
      filtered = filtered.filter(hero => hero.tags.includes(this.filterByTag().toLowerCase()));
    }
    return filtered;
  }

  private _filterElements(heroFilter: Hero[]) {
    let auxFiltered = Array<Hero>();
    this.filterByElement().forEach(element => {
      auxFiltered = [...auxFiltered, ...heroFilter.filter(hero => hero.element.toLowerCase().includes(element.toLowerCase()))];
    });
    return auxFiltered.length > 0 ? auxFiltered : heroFilter;
  }

  private _filterRoles(heroFilter: Hero[]) {
    let auxFiltered = Array<Hero>();
    this.filterByRole().forEach(roles => {
      auxFiltered = [...auxFiltered, ...heroFilter.filter(hero => hero.class.toLowerCase().includes(roles.toLowerCase()))];
    });
    return auxFiltered.length > 0 ? auxFiltered : heroFilter;
  }
}
