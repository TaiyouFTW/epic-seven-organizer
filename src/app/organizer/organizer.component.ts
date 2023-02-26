import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HeroFormComponent } from '../_shared/components/hero-form/hero-form.component';
import { HelpersService } from '../_shared/services/helpers.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private helpersService: HelpersService,
  ) { }

  ngOnInit(): void {
  }

  addHero() {
    const dialogRef = this.dialog.open(HeroFormComponent, {
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'custom-dialog',
      minWidth: '30vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.id) {
          // TODO: search by id and update
          console.log(result, 'edit');
        } else {
          // TODO: add new
          console.log(result, 'new');
          //  = this.helpersService.createUuid();
        }
      }
    })
  }

}
