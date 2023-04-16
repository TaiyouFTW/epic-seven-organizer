import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-filter-by-role',
  templateUrl: './filter-by-role.component.html',
  styleUrls: ['./filter-by-role.component.scss']
})
export class FilterByRoleComponent implements OnInit {

  roles: string[] = [];
  selected: string = '';

  @Output() clickedFilter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private helpersService: HelpersService) {
    this.roles = this.helpersService.roles;
  }

  ngOnInit(): void {
  }

  filter(role: string) {
    if (role.toLowerCase() == this.selected.toLowerCase()) {
      this.selected = '';
    } else {
      this.selected = role;
    }

    this.clickedFilter.emit(this.selected);
  }
}
