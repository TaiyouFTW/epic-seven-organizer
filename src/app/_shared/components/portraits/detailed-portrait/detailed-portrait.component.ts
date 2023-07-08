import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from 'src/app/_shared/interfaces/hero';
import { PortraitService } from 'src/app/_shared/services/portrait.service';

@Component({
  selector: 'app-detailed-portrait',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-portrait.component.html',
  styleUrls: ['./detailed-portrait.component.scss']
})
export class DetailedPortraitComponent {

  portraitService = inject(PortraitService);

  source: string = '';
  alt: string = '';

  private _hero: Hero = {} as Hero;
  @Input()
  get hero(): Hero { return this._hero }
  set hero(hero: Hero) {
    this._hero = hero;
    this.alt = hero.name;
    this.source = this.portraitService.hero(hero.code);
    this.hero.class = this.hero.class.replace(" ", "-").toLowerCase();
  }

  @Input() mini?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  error(event: Event) {
    const src = this.portraitService.error(this.hero);
    let imageTarget = (event.target as HTMLImageElement);
    imageTarget.src = src;
  }

}
