import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-hero-priority',
  templateUrl: './hero-priority.component.html',
  styleUrls: ['./hero-priority.component.scss']
})
export class HeroPriorityComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<HeroPriorityComponent>,
    @Inject(MAT_DIALOG_DATA) public heroes: Hero[]
  ) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Hero[]>) {
    moveItemInArray(this.heroes, event.previousIndex, event.currentIndex);
  }

  save() {
    this.heroes.forEach(hero => {
      let currentIndex = this.heroes.indexOf(hero);
      let previousIndex = this.heroes.indexOf(hero);
      hero.priority = currentIndex;
      moveItemInArray(this.heroes, previousIndex, currentIndex);
    });
    this.dialogRef.close(this.heroes);
  }

}
