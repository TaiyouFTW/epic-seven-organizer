import { Component, Input, OnInit } from '@angular/core';
import { BuildHero } from '../../interfaces/hero';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: BuildHero = {} as BuildHero;

  constructor() { }

  ngOnInit(): void {
  }

}
