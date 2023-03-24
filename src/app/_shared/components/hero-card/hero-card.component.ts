import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { ConfirmDialog } from '../../interfaces/confirm-dialog';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { HeroFormComponent } from '../hero-form/hero-form.component';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {

  @Input() hero!: Hero;

  constructor(public dialog: MatDialog, private heroService: HeroService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  edit(hero: Hero) {
    const dialogRef = this.dialog.open(HeroFormComponent, {
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'custom-dialog',
      minWidth: '30vw',
      data: { ...hero }
    });

    dialogRef.afterClosed()
      .pipe(map((hero: Hero) => hero || null))
      .subscribe((hero: Hero) => {
        if (hero != null) {
          this.heroService.add(hero);
        }
      })
  }

  remove(id: string, heroName: string) {
    let confirmDialog = {
      heading: `Delete ${heroName}?`,
      body: `Are sure you want to delete <strong>${heroName}</strong>?<br>You can't undo this action.`,
      action: 'Delete'
    } as ConfirmDialog;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      autoFocus: true,
      restoreFocus: false,
      panelClass: 'custom-dialog',
      minWidth: '15vw',
      data: confirmDialog
    });

    dialogRef.afterClosed()
      .subscribe((canRemove: boolean) => {
        if (canRemove) {
          this.heroService.delete(id);
          this._snackBar.open(`${heroName} has been removed`, 'Ok', {
            panelClass: 'custom-snackbar',
            duration: 3000,
          });
        }
      })

  }

}
