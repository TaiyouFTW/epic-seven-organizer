import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortraitService } from 'src/app/_shared/services/portrait.service';
import { Artifact } from 'src/app/_shared/interfaces/artifact';
import { Hero } from 'src/app/_shared/interfaces/hero';

@Component({
  selector: 'app-basic-portrait',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basic-portrait.component.html',
  styleUrls: ['./basic-portrait.component.scss']
})
export class BasicPortraitComponent {

  portraitService = inject(PortraitService);

  source: string = '';
  alt: string = '';
  hasFrame: boolean = false;

  private _hero: Hero = {} as Hero;
  @Input()
  get hero(): Hero { return this._hero }
  set hero(hero: Hero) {
    this._hero = hero;
    this.alt = hero.name;
    this.hasFrame = true;
    this.source = this.portraitService.hero(hero.code);
  }

  private _artifact: Artifact = {} as Artifact;
  @Input()
  get artifact(): Artifact { return this._artifact }
  set artifact(artifact: Artifact) {
    this._artifact = artifact;
    this.alt = artifact.name;
    this.hasFrame = false;
    this.source = this.portraitService.artifact(artifact.code);
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
