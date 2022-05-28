import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Artifact } from '../_shared/interfaces/artifact';
import { BuildHero, Hero } from '../_shared/interfaces/hero';
import { ArtifactService } from '../_shared/services/artifact.service';
import { HeroService } from '../_shared/services/hero.service';
import { AddHeroComponent } from '../_shared/components/_dialogs/add-hero/add-hero.component';
import { HeroPoolService } from '../_shared/services/hero-pool.service';
import { SetPriorityComponent } from '../_shared/components/_dialogs/change-priority/change-priority.component';
import { ChangeVisibilityComponent } from '../_shared/components/_dialogs/change-visibility/change-visibility.component';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent {

  allHeroes: Hero[] = [];
  allArtifacts: Artifact[] = [];

  heroes: BuildHero[] = new Array<BuildHero>();
  filteredHeroes: BuildHero[] = new Array<BuildHero>();

  order: string = 'priority';

  constructor(
    private heroService: HeroService,
    private heroPoolService: HeroPoolService,
    private artifactService: ArtifactService,
    public dialog: MatDialog
  ) {
    this.getHeroes();
    this.getArtifacts();
    this.getHeroPool();
  }

  getHeroes() {
    this.heroService.heroes().subscribe(listHero => {
      this.allHeroes = listHero.heroes;
    });
  }

  getArtifacts() {
    this.artifactService.artifacts().subscribe(listArtifact => {
      this.allArtifacts = listArtifact.artifacts;
    });
  }

  getHeroPool() {
    this.heroes = this.heroPoolService.currentHeroPoolValue != null ? this.heroPoolService.currentHeroPoolValue : Array<BuildHero>();
    this.filteredHeroes = this.heroes;
  }

  addHero() {
    const dialogRef = this.dialog.open(AddHeroComponent, {
      data: {
        heroes: this.allHeroes,
        artifacts: this.allArtifacts
      },
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef
      .afterClosed()
      .pipe(filter(result => result))
      .subscribe(hero => {
        hero.priority = this.heroes.length;
        this.heroes.push(hero);
        this.updateHeroPool();
      });
  }

  changePriority() {
    const dialogRef = this.dialog.open(SetPriorityComponent, {
      data: this.heroes,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef
      .afterClosed()
      .pipe(filter(result => result))
      .subscribe((heroes: BuildHero[]) => {
        this.heroes = heroes;
        this.updateHeroPool();
      });
  }

  setVisibility() {
    const dialogRef = this.dialog.open(ChangeVisibilityComponent, {
      data: this.heroes,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef
      .afterClosed()
      .pipe(filter(result => result))
      .subscribe((heroes: BuildHero[]) => {
        this.heroes = heroes;
        this.updateHeroPool();
      });
  }

  changeHeroBuildStatus(hero: BuildHero) {
    const index = this.heroes.indexOf(hero);
    this.heroes[index] = hero;
    this.updateHeroPool();
  }

  updateHero(heroes: [BuildHero, BuildHero]) {
    const index = this.heroes.indexOf(heroes[1]);
    this.heroes[index] = heroes[0];
    this.updateHeroPool();
  }

  deleteHero(hero: BuildHero) {
    const index = this.heroes.indexOf(hero);
    this.heroes.splice(index, 1);
    this.updateHeroPool();
  }

  updateHeroPool() {
    this.heroPoolService.currentHeroPoolValue = this.heroes;
    this.filteredHeroes = this.heroes;
  }
}