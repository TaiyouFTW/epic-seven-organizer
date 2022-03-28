import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  show() {
    const loading = document.getElementById('loading');
    loading?.classList.add('showLoading');
  }

  hide() {
    const loading = document.getElementById('loading');
    loading?.classList.remove('showLoading');
  }
}