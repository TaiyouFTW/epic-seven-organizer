import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter, map, take, tap } from 'rxjs';
import { Artifact } from '../_shared/interfaces/artifact';
import { BuildHero, Hero, ListedHero } from '../_shared/interfaces/hero';
import { ArtifactService } from '../_shared/services/artifact.service';
import { EpicService } from '../_shared/services/epic.service';
import { HeroService } from '../_shared/services/hero.service';
import { AddHeroComponent } from '../_shared/components/_dialogs/add-hero/add-hero.component';
import { HeroPoolService } from '../_shared/services/hero-pool.service';
import { HelpersService } from '../_shared/services/helpers.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  allHeroes: Hero[] = [];
  allArtifacts: Artifact[] = [];
  // unknown: Hero = {} as Hero;

  heroes: BuildHero[] = new Array<BuildHero>();

  displayedColumns: string[] = ['bars', 'image', 'element', 'role', 'name', 'build', 'level'];
  // dataSource = new MatTableDataSource<Hero>();

  page: number = 0;
  totalPages: number = 1;

  order: string = 'priority';

  tags: string[] = [];

  chipFilter: string = 'all';

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
        this.heroPoolService.currentHeroPoolValue = this.heroes;
      });
  }

  setChipFilter(chip: string) {
    this.chipFilter = chip.toLowerCase();
  }

  verifyChipFilter(tags: string[]) {
    if (this.chipFilter === 'all') {
      return true;
    }
    return tags.some(tag => tag.toLowerCase() === this.chipFilter);
  }

  filterHeroes() {
    return this.heroes.filter(hero => this.verifyChipFilter(hero.tags));
  }
}
