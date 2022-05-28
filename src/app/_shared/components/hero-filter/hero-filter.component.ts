import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BuildHero } from '../../interfaces/hero';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-hero-filter',
  templateUrl: './hero-filter.component.html',
  styleUrls: ['./hero-filter.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() heroes!: BuildHero[];

  @Input() filteredHeroes!: BuildHero[];
  @Output() filteredHeroesChange = new EventEmitter<BuildHero[]>();

  showOnlyActive: boolean = false;

  filterByStatus: string = 'All';
  listStatus: string[] = this.helpersService.getBuildStatus;
  chips: string[] = ['all'];

  constructor(private helpersService: HelpersService) { }

  ngOnInit(): void {
    this.filter();
  }

  filteredByVisibility(event: boolean) {
    this.showOnlyActive = event;
    this.filter();
  }

  filteredByStatus(event: string) {
    this.filterByStatus = event;
    this.filter();
  }

  filteredByChips(event: string[]) {
    this.chips = event;
    this.filter();
  }

  filter() {
    const heroesFilteredByVisibility = this.showOnlyActive ? this.heroes.filter(hero => hero.visible) : this.heroes;
    const heroesFilteredByStatus = heroesFilteredByVisibility.filter(hero => this.filterByStatus.toLowerCase() == 'all' ? heroesFilteredByVisibility : hero.buildStatus.toLowerCase() == this.filterByStatus.toLowerCase());
    const heroesFilteredByChips = heroesFilteredByStatus.filter(hero => {
      let isInFilter = this.chips.indexOf('all') >= 0 ? true : false;
      if (hero.tags != null) {
        hero.tags.forEach(tag => {
          if (this.chips.indexOf(tag.toLowerCase()) >= 0) {
            isInFilter = true;
          }
        });
      }
      return isInFilter;
    });

    this.filteredHeroes = heroesFilteredByChips;
    this.filteredHeroesChange.emit(this.filteredHeroes);
  }
}
