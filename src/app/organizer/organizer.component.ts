import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HeroPoolService } from '../_shared/services/hero-pool.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HeroFormComponent } from '../_shared/components/hero-form/hero-form.component';
import { HeroCardComponent } from "../_shared/components/hero-card/hero-card.component";
import { TagsComponent } from "../_shared/components/tags/tags.component";
import { IconDefinition, faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelpersService } from '../_shared/services/helpers.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdvancedFilterComponent } from '../_shared/components/advanced-filter/advanced-filter.component';
import { ChangePriorityComponent } from '../_shared/components/change-priority/change-priority.component';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-organizer',
  standalone: true,
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    HeroCardComponent,
    TagsComponent,
    FontAwesomeModule,
    MatSidenavModule,
    MatBadgeModule
  ]
})
export class OrganizerComponent {

  dialog = inject(MatDialog);
  heroPoolService = inject(HeroPoolService);
  helpersService = inject(HelpersService);

  faFilter: IconDefinition = faFilter;
  faSort: IconDefinition = faSort;

  constructor() { }

  addHero() {
    let dialogRef = this.dialog.open(HeroFormComponent, {
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'custom-dialog',
      data: null
    });

    dialogRef.afterClosed().subscribe((canClear: boolean) => canClear ? this.clearFilters() : null);
  }

  showFilter() {
    this.dialog.open(AdvancedFilterComponent, {
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'custom-dialog'
    });
  }

  changePriority() {
    this.dialog.open(ChangePriorityComponent, {
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'custom-dialog'
    });
  }

  clearFilters() {
    this.heroPoolService.filterByElement.set([]);
    this.heroPoolService.filterByRole.set([]);
    this.heroPoolService.filterByTag.set('');
  }

}
