import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  lastUpdate: WritableSignal<Date> = signal(new Date());

  constructor() {
    const lastUpdateAux = localStorage.getItem('e7OrganizerLastUpdate');
    if (lastUpdateAux != null) {
      this.lastUpdate.set(new Date(JSON.parse(lastUpdateAux)));
    }
  }

  canUpdate(listLength: number) {
    let today = new Date();

    const daysToAdd = (4 - this.lastUpdate().getDay() + 7) % 7;
    let nextThursdayAfterLastUpdate = new Date();
    nextThursdayAfterLastUpdate.setDate(this.lastUpdate().getDate() + daysToAdd);

    today.setHours(0, 0, 0, 0);
    nextThursdayAfterLastUpdate.setHours(0, 0, 0, 0);

    if (today.getTime() < nextThursdayAfterLastUpdate.getTime() && today.getDay() != 4 && listLength > 0) {
      return false;
    }
    return true;
  }
}
