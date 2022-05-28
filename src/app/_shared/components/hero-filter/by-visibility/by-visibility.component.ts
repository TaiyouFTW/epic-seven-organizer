import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-by-visibility',
  templateUrl: './by-visibility.component.html',
  styleUrls: ['./by-visibility.component.scss']
})
export class ByVisibilityComponent implements OnInit {

  @Input() byVisibility!: boolean;
  @Output() byVisibilityChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  change() {
    this.byVisibility = !this.byVisibility;
    this.byVisibilityChange.emit(this.byVisibility);
  }
}
