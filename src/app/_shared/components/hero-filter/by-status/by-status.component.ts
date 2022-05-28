import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BuildHero } from 'src/app/_shared/interfaces/hero';
import { HelpersService } from 'src/app/_shared/services/helpers.service';

@Component({
  selector: 'app-by-status',
  templateUrl: './by-status.component.html',
  styleUrls: ['./by-status.component.scss']
})
export class ByStatusComponent implements OnInit {

  @Output() statusChange = new EventEmitter<string>();

  filterByStatus: FormControl = new FormControl('All');
  listStatus: string[] = this.helpersService.getBuildStatus;

  constructor(private helpersService: HelpersService) { }

  ngOnInit(): void { }

  buildStatus() {
    this.statusChange.emit(this.filterByStatus.value.toLowerCase());
  }
}
