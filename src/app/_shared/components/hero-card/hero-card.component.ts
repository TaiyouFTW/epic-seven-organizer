import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { BuildHero } from '../../interfaces/hero';
import { DeleteComponent } from '../_dialogs/delete/delete.component';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero: BuildHero = {} as BuildHero;
  @Output() onDeleteEvent = new EventEmitter<BuildHero>();

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
