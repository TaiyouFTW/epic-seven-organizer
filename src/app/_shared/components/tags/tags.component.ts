import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { HelpersService } from '../../services/helpers.service';
import { HeroPoolService } from '../../services/hero-pool.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {

  helpersService = inject(HelpersService);
  heroPoolService = inject(HeroPoolService);

  tags: string[] = [];

  ngOnInit(): void {
    this.tags = this.helpersService.tags();
  }

  filter(chip: string) {
    if (chip == this.heroPoolService.filterByTag()) {
      this.heroPoolService.filterByTag.set('');
    } else {
      this.heroPoolService.filterByTag.set(chip);
    }
  }
}

