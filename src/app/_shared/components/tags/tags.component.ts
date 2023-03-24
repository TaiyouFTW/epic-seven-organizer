import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Input() hero?: Hero;

  @Output() clickedFilter: EventEmitter<string> = new EventEmitter<string>();

  tags: string[] = [];

  constructor(
    private helpersService: HelpersService
  ) {
  }

  ngOnInit(): void {
    if (this.hero) {
      this.tags = this.hero.tags;
    } else {
      this.tags = this.helpersService.tags;
    }
  }

  filterBy(tag: string) {
    this.clickedFilter.emit(tag);
  }
}
