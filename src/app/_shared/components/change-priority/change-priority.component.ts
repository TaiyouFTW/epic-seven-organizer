import { Component, Signal, WritableSignal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faSort, faUpDownLeftRight } from '@fortawesome/free-solid-svg-icons';
import { BasicPortraitComponent } from '../portraits/basic-portrait/basic-portrait.component';
import { HeroPoolService } from '../../services/hero-pool.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Hero } from '../../interfaces/hero';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-change-priority',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    BasicPortraitComponent,
    CdkDrag,
    MatButtonModule,
    CdkDropList,
    MatDialogModule,
    CdkDragHandle
  ],
  templateUrl: './change-priority.component.html',
  styleUrls: ['./change-priority.component.scss']
})
export class ChangePriorityComponent {

  heroPoolService = inject(HeroPoolService);

  faSort: IconDefinition = faSort;

  tempHeroes = [...this.heroPoolService.heroes()];

  constructor(private _dialogRef: MatDialogRef<ChangePriorityComponent>,) { }

  drop(event: CdkDragDrop<Hero[]>) {
    console.log(event)
    moveItemInArray(this.tempHeroes, event.previousIndex, event.currentIndex);
  }

  save() {
    this.tempHeroes.forEach(hero => {
      let currentIndex = this.tempHeroes.indexOf(hero);
      let previousIndex = this.tempHeroes.indexOf(hero);

      hero.priority = currentIndex;
      moveItemInArray(this.tempHeroes, previousIndex, currentIndex);
      this.heroPoolService.update(hero);
    });

    this.heroPoolService.sort();

    this._dialogRef.close();
  }

}
