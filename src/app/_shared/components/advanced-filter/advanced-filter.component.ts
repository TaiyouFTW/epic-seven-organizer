import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from "./filter/filter.component";
import { HelpersService } from '../../services/helpers.service';
import { HeroPoolService } from '../../services/hero-pool.service';
import { IconDefinition, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-advanced-filter',
  standalone: true,
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.scss'],
  imports: [
    CommonModule,
    FilterComponent,
    FontAwesomeModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class AdvancedFilterComponent {

  heroPoolService = inject(HeroPoolService);
  helpersService = inject(HelpersService);

  faFilter: IconDefinition = faFilter;
}
