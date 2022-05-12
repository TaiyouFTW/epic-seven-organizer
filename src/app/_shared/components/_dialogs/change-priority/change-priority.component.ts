import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuildHero } from 'src/app/_shared/interfaces/hero';
import { ConfigService } from 'src/app/_shared/services/config.service';

@Component({
  selector: 'app-change-priority',
  templateUrl: './change-priority.component.html',
  styleUrls: ['./change-priority.component.scss']
})
export class SetPriorityComponent implements OnInit {

  theme: string = 'light';
  heroes: BuildHero[] = new Array<BuildHero>();

  constructor(
    public dialogRef: MatDialogRef<SetPriorityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BuildHero[],
    private configService: ConfigService
  ) {
    this.theme = this.configService.currentThemePreferenceValue;
    this.heroes = data.slice(0);
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<BuildHero[]>) {
    moveItemInArray(this.heroes, event.previousIndex, event.currentIndex);
  }

  save() {
    this.data.forEach(hero => {
      let currentIndex = this.heroes.indexOf(hero);
      let previousIndex = this.data.indexOf(hero);
      hero.priority = currentIndex;
      moveItemInArray(this.data, previousIndex, currentIndex);
    });
    this.dialogRef.close(this.data);
  }
}
