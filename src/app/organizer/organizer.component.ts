import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map } from 'rxjs';
import { HeroFormComponent } from '../_shared/components/hero-form/hero-form.component';
import { HeroPriorityComponent } from '../_shared/components/hero-priority/hero-priority.component';
import { Hero } from '../_shared/interfaces/hero';
import { HelpersService } from '../_shared/services/helpers.service';
import { HeroService } from '../_shared/services/hero.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    public dialog: MatDialog,
    private heroService: HeroService
  ) {
    this.heroes = this.heroService.myHeroesValue != null ? this.heroService.myHeroesValue : [];
  }

  ngOnInit(): void {
  }

  addHero() {
    const dialogRef = this.dialog.open(HeroFormComponent, {
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'custom-dialog',
      minWidth: '30vw',
      data: null
    });

    dialogRef.afterClosed()
      .pipe(map((hero: Hero) => hero || null))
      .subscribe((hero: Hero) => {
        if (hero != null) {
          this.heroService.add(hero);
          this.heroes = this.heroService.myHeroesValue;
        }
      })
  }

  filterByTag(tag: string) {
    this.heroes = this.heroService.myHeroesValue;
    if (tag != 'all') {
      this.heroes = this.heroes.filter(hero => hero.tags.includes(tag));
    }
  }

  changePriority() {
    const dialogRef = this.dialog.open(HeroPriorityComponent, {
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'custom-dialog',
      minWidth: '30vw',
      data: [...this.heroService.myHeroesValue]
    });

    dialogRef.afterClosed()
      .pipe(map((heroes: Hero[]) => heroes || null))
      .subscribe((heroes: Hero[]) => {
        if (heroes != null) {
          this.heroes = heroes;
          this.heroService.updateHeroPool(heroes);
        }
      })
  }
}
