import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Artifact } from '../../interfaces/artifact';
import { BuildHero, Hero } from '../../interfaces/hero';
import { HelpersService } from '../../services/helpers.service';
import { DeleteComponent } from '../_dialogs/delete/delete.component';
import { EditHeroComponent } from '../_dialogs/edit-hero/edit-hero.component';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: BuildHero = {} as BuildHero;
  @Input() heroes: Hero[] = [];
  @Input() artifacts: Artifact[] = [];
  @Output() onAddEvent = new EventEmitter<BuildHero>();
  @Output() onEditEvent = new EventEmitter<[BuildHero, BuildHero]>();
  @Output() onDeleteEvent = new EventEmitter<BuildHero>();
  @Output() onChangeBuildStatus = new EventEmitter<BuildHero>();

  buildStatus: string[] = [];

  selectedBuildStatus: string = '';

  constructor(
    public dialog: MatDialog,
    private helpersService: HelpersService
  ) {
    this.buildStatus = this.helpersService.getBuildStatus;
  }

  ngOnInit(): void {
  }

  changeStatus(hero: BuildHero) {
    this.onChangeBuildStatus.emit(hero);
  }

  edit() {
    let auxHero = this.hero;
    const dialogRef = this.dialog.open(EditHeroComponent, {
      data: {
        hero: this.hero,
        heroes: this.heroes,
        artifacts: this.artifacts
      },
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef
      .afterClosed()
      .pipe(filter(result => result))
      .subscribe((hero: BuildHero) => {
        this.onEditEvent.emit([hero, auxHero]);
      });
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: this.hero.name,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef
      .afterClosed()
      .pipe(filter(result => result))
      .subscribe(canDelete => {
        if (canDelete) {
          this.onDeleteEvent.emit(this.hero);
        }
      });
  }

}
