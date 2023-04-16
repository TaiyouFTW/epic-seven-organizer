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
  tag: string = 'all';

  showFilter: boolean = false;

  constructor(
    public dialog: MatDialog,
    private heroService: HeroService
  ) {
    this.heroes = this.heroService.myHeroesValue != null ? this.heroService.myHeroesValue : [];
  }

  ngOnInit(): void {
    this.heroService.myHeroes$.subscribe(updatedPool => {
      this.heroes = updatedPool;

      if (this.tag != 'all') {
        this.filterByTag(this.tag);
      }
    });
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
          this.tag = 'all';
        }
      })
  }

  filterByTag(selectedTag: string) {
    this.tag = selectedTag;
    this.heroes = this.heroService.myHeroesValue;
    if (selectedTag != 'all') {
      this.heroes = this.heroes.filter(hero => hero.tags.includes(selectedTag));
    }
  }

  filterByRole(selectedRole: string) {
    this.heroes = selectedRole != '' ? this.heroService.myHeroesValue.filter(hero => hero.class == selectedRole) : this.heroService.myHeroesValue;
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
          this.heroService.updateHeroPool(heroes);
        }
      })
  }
}
