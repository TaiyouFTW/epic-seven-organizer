import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildHero } from 'src/app/_shared/interfaces/hero';

@Component({
  selector: 'app-change-visibility',
  templateUrl: './change-visibility.component.html',
  styleUrls: ['./change-visibility.component.scss']
})
export class ChangeVisibilityComponent implements OnInit {

  allSlideToggle: boolean = false;
  toggleList: boolean[] = new Array<boolean>();

  constructor(
    public dialogRef: MatDialogRef<ChangeVisibilityComponent>,
    @Inject(MAT_DIALOG_DATA) public heroes: BuildHero[],
  ) {
    this.heroes.forEach(hero => {
      this.toggleList.push(hero.visible);
    });
    this.allSlideToggle = this.heroes.find(hero => hero.visible) == null ? false : true;
  }

  ngOnInit(): void {
  }

  changeVisibility(visibility: boolean, index: number) {
    this.toggleList[index] = !visibility;

    this.checkAll();
  }

  toggleAll() {
    this.allSlideToggle = !this.allSlideToggle;

    for (let i = 0; i < this.toggleList.length; i++) {
      this.toggleList[i] = this.allSlideToggle;
    }
  }

  checkAll() {
    let countVisible = 0;
    let countNotVisible = 0;
    this.toggleList.forEach(item => {
      countVisible = item ? countVisible + 1 : countVisible;
      countNotVisible = item ? countNotVisible : countNotVisible + 1;
    });
    if (countVisible == this.toggleList.length) {
      this.allSlideToggle = true;
    }
    if (countNotVisible == this.toggleList.length) {
      this.allSlideToggle = false;
    }
  }

  save() {
    for (let i = 0; i < this.heroes.length; i++) {
      this.heroes[i].visible = this.toggleList[i];
    }
    this.dialogRef.close(this.heroes);
  }
}
