import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private canLoad: WritableSignal<boolean> = signal(false);
  loading: Signal<boolean> = computed(() => this.canLoad());

  show = () => this.canLoad.set(true);

  hide = () => this.canLoad.set(false);
}
