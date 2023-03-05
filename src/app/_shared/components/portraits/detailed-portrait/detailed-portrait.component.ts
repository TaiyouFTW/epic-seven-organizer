import { Component, Input, OnInit } from '@angular/core';
import { Artifact } from 'src/app/_shared/interfaces/artifact';
import { Hero } from 'src/app/_shared/interfaces/hero';
import { PortraitService } from 'src/app/_shared/services/portrait.service';

@Component({
  selector: 'app-detailed-portrait',
  templateUrl: './detailed-portrait.component.html',
  styleUrls: ['./detailed-portrait.component.scss']
})
export class DetailedPortraitComponent implements OnInit {

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

  constructor(private portraitService: PortraitService) { }

  ngOnInit(): void {
  }

  error(event: Event) {
    const src = this.portraitService.error(this.hero);
    let imageTarget = (event.target as HTMLImageElement);
    imageTarget.src = src;
  }

}
