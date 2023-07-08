import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../interfaces/hero';
import { DetailedPortraitComponent } from "../portraits/detailed-portrait/detailed-portrait.component";
import { BasicPortraitComponent } from "../portraits/basic-portrait/basic-portrait.component";
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HeroPoolService } from '../../services/hero-pool.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialog } from '../../interfaces/confirm-dialog';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  imports: [CommonModule, DetailedPortraitComponent, BasicPortraitComponent, MatDividerModule, FontAwesomeModule, MatSnackBarModule, MatButtonModule]
})
export class HeroCardComponent {

  @Input({ required: true }) hero!: Hero;

  heroPoolService = inject(HeroPoolService);

  faEdit: IconDefinition = faEdit;
  faTrash: IconDefinition = faTrash;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  edit(hero: Hero) {
    this.dialog.open(HeroFormComponent, {
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'custom-dialog',
      minWidth: '30vw',
      data: { ...hero }
    });
  }

  remove(id: string, heroName: string) {
    let confirmDialog = {
      heading: `Delete ${heroName}?`,
      body: [`Are sure you want to delete <strong>${heroName}</strong>?`, `You can't undo this action.`],
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
          this.heroPoolService.remove(id);
          this._snackBar.open(`${heroName} has been removed`, 'Ok', {
            panelClass: 'custom-snackbar',

            duration: 3000000000,
          });
        }
      })
  }

  setTag(tag: string) {
    this.heroPoolService.filterByTag.set(tag);
  }

}
