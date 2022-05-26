import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Artifact } from '../_shared/interfaces/artifact';
import { BuildHero, Hero } from '../_shared/interfaces/hero';
import { ArtifactService } from '../_shared/services/artifact.service';
import { HeroService } from '../_shared/services/hero.service';
import { AddHeroComponent } from '../_shared/components/_dialogs/add-hero/add-hero.component';
import { HeroPoolService } from '../_shared/services/hero-pool.service';
import { HelpersService } from '../_shared/services/helpers.service';
import { SetPriorityComponent } from '../_shared/components/_dialogs/change-priority/change-priority.component';
import { ChangeVisibilityComponent } from '../_shared/components/_dialogs/change-visibility/change-visibility.component';
import { FormControl } from '@angular/forms';

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

  displayedColumns: string[] = ['bars', 'image', 'element', 'role', 'name', 'build', 'level'];

  page: number = 0;
  totalPages: number = 1;

  order: string = 'priority';

  tags: string[] = [];

  chipFilter: string[] = ['all'];

  filterByStatus: FormControl = new FormControl('All');
  buildStatus: string[] = [];

  isVisible: boolean = false;

  constructor(
    private heroService: HeroService,
    private heroPoolService: HeroPoolService,
    private artifactService: ArtifactService,
    private helpersService: HelpersService,
    public dialog: MatDialog
  ) {
    this.getHeroes();
    this.getArtifacts();
    this.getHeroPool();

    this.tags = this.helpersService.getTags;
    this.buildStatus = this.helpersService.getBuildStatus;
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
        this.chipFilter = ['all'];
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
        this.chipFilter = ['all'];
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
        this.chipFilter = ['all'];
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

  setChipFilter(chip: string) {

    const index = this.chipFilter.indexOf(chip.toLowerCase());
    const hasAll = this.chipFilter.indexOf('all');
    if (index >= 0) {
      this.chipFilter.splice(index, 1);
    } else {
      this.chipFilter.push(chip.toLowerCase());
    }
    if (hasAll >= 0 && this.chipFilter.length > 1) {
      this.chipFilter.splice(hasAll, 1);
    }
    if (chip == 'all' || this.chipFilter.length == 0) {
      this.chipFilter = ['all'];
    }
    this.filterHeroes();
  }

  verifyChipFilter(tags: string[]) {
    if (this.chipFilter.indexOf('all') >= 0) {
      return true;
    }
    return tags.some(tag => {
      return this.chipFilter.indexOf(tag.toLowerCase()) >= 0;
    });
  }

  filterHeroes() {
    const auxFilteredHeroes = this.heroes.filter(hero => {
      let isInFilter = this.chipFilter.indexOf('all') >= 0 ? true : false;
      if (hero.tags != null) {
        hero.tags.forEach(tag => {
          if (this.chipFilter.indexOf(tag.toLowerCase()) >= 0) {
            isInFilter = true;
          }
        });
      }
      return isInFilter;
    });

    if (this.isVisible) {
      this.filteredHeroes = auxFilteredHeroes;
    } else {
      this.filteredHeroes = auxFilteredHeroes.filter(hero => hero.visible);
    }
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
    this.filterHeroes();
  }

  updateHeroPool() {
    this.heroPoolService.currentHeroPoolValue = this.heroes;
    this.filteredHeroes = this.heroes;
  }

  statusFilter() {
    if (this.filterByStatus.value.toLowerCase() == 'all') {
      this.filteredHeroes = this.heroes;
    } else {
      this.filteredHeroes = this.heroes.filter(hero => hero.buildStatus.toLowerCase() == this.filterByStatus.value.toLowerCase());
    }
  }
}
