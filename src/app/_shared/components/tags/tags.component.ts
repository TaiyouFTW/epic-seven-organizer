import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Input() tag: string = 'all';
  @Output() tagChange: EventEmitter<string> = new EventEmitter<string>();

  @Output() clickedFilter: EventEmitter<string> = new EventEmitter<string>();

  tags: string[] = [];

  constructor(
    private helpersService: HelpersService
  ) {
  }

  ngOnInit(): void {
    this.tags = this.helpersService.tags;
  }

  filterBy(tag: string) {
    this.tagChange.emit(tag);
    this.clickedFilter.emit(tag);
  }
}
