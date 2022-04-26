import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, take, tap } from 'rxjs';
import { BuildHero, Hero, ListedHero } from '../_shared/interfaces/hero';
import { EpicService } from '../_shared/services/epic.service';
import { HeroService } from '../_shared/services/hero.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  allHeroes: Hero[] = [];
  unknown: Hero = {} as Hero;

  heroes: Hero[] = new Array<Hero>();

  displayedColumns: string[] = ['bars', 'image', 'element', 'role', 'name', 'build', 'level'];
  dataSource = new MatTableDataSource<Hero>();

  page: number = 0;
  totalPages: number = 1;

  constructor(
    private heroService: HeroService
  ) {
    if (this.heroService.currentHeroesValue == null) {
      this.getHeroes();
    } else {
      this.allHeroes = this.heroService.currentHeroesValue.heroes;
    }
  }

  getHeroes() {
    this.heroService.heroes().subscribe(listHero => {
      this.allHeroes = listHero.heroes;
    });
  }

  addBuildedHeroes($event: BuildHero) {
    this.heroes.push($event);
  }
}
