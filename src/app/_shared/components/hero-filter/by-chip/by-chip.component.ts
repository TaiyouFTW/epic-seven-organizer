import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BuildHero } from 'src/app/_shared/interfaces/hero';
import { HelpersService } from 'src/app/_shared/services/helpers.service';

@Component({
  selector: 'app-by-chip',
  templateUrl: './by-chip.component.html',
  styleUrls: ['./by-chip.component.scss']
})
export class ByChipComponent implements OnInit {

  @Output() chipsChange = new EventEmitter<string[]>();

  chips: string[] = ['all'];
  tags: string[] = this.helpersService.getTags;

  constructor(private helpersService: HelpersService) { }

  ngOnInit(): void {
  }

  setChip(chip: string) {
    const index = this.chips.indexOf(chip.toLowerCase());
    const hasAll = this.chips.indexOf('all');
    if (index >= 0) {
      this.chips.splice(index, 1);
    } else {
      this.chips.push(chip.toLowerCase());
    }
    if (hasAll >= 0 && this.chips.length > 1) {
      this.chips.splice(hasAll, 1);
    }
    if (chip == 'all' || this.chips.length == 0) {
      this.chips = ['all'];
    }

    this.chipsChange.emit(this.chips);
  }
}
