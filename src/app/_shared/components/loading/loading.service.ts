import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _canLoad: WritableSignal<boolean> = signal(false);
  loading: Signal<boolean> = computed(() => this._canLoad());

  show = () => this._canLoad.set(true);

  hide = () => this._canLoad.set(false);
}
