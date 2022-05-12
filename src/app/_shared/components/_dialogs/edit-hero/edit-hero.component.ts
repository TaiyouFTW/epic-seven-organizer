import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogHero } from 'src/app/_shared/interfaces/dialogHero';
import { BuildHero } from 'src/app/_shared/interfaces/hero';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss']
})
export class EditHeroComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditHeroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogHero,
  ) { }

  ngOnInit(): void {
  }

  edit(hero: BuildHero) {
    this.dialogRef.close(hero);
  }
}
