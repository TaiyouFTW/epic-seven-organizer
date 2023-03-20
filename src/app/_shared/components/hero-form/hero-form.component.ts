import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Artifact } from '../../interfaces/artifact';
import { Hero } from '../../interfaces/hero';
import { ArtifactService } from '../../services/artifact.service';
import { HelpersService } from '../../services/helpers.service';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  hero: Hero;
  heroes: Hero[] = [];
  filteredHeroes!: Observable<Hero[]>;

  artifacts: Artifact[] = [];
  filteredArtifacts!: Observable<Artifact[]>;

  tags: string[];
  status: string[];
  artifactLevel: number[];
  skills: number[];
  awakenings: number[];
  trees: number[];
  imprints: string[];

  form!: FormGroup;
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  showTree: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<HeroFormComponent>,
    private formBuilder: FormBuilder,
    private helpersService: HelpersService,
    private heroService: HeroService,
    private artifactService: ArtifactService,
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {
    this.hero = {} as Hero;

    this.tags = ['pvp', 'pve', 'wyvern', 'golem', 'banshee', 'azimanak', 'caides', 'expedition', 'lab'];
    this.status = ['Worst', 'Need Fix', 'Ok', 'Best'];
    this.artifactLevel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    this.skills = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.awakenings = [0, 1, 2, 3, 4, 5, 6];
    this.trees = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    this.imprints = [];

    this.form = this.formBuilder.group({
      hero: [null, Validators.required],
      level: [0],
      artifact: [null],
      artifactLevel: [-1],
      skills: [0],
      awakening: [0],
      imprint: ['none'],
      tree: [null],
      status: [this.status[2]],
      tags: [[]]
    });
    this.disableArtifactForm();

    this.getHeroes();
    this.getArtifacts();


    if (data != null) {
      this.form.controls['hero'].disable();
      this.f['hero'].setValue(data);
      this.f['level'].setValue(data.level);
      this.f['status'].setValue(data.status);
      this.f['tags'].setValue(data.tags);
      this.f['artifact'].setValue(data.artifact?.name);
      this.f['artifactLevel'].setValue(data.artifact?.level);
      this.f['skills'].setValue(data.skills);
      this.f['awakening'].setValue(data.awakening);
      this.f['imprint'].setValue(data.imprint);
      if (this._hasSpecialtyChange(data)) {
        this.f['tree'].setValue(data.tree);
      } else {
        this.f['tree'].setValue(null);
      }

      this.selectedHero();
      if (data.artifact != null) {
        this.selectedArtifact();
      }
    }
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
  }

  getHeroes() {
    this.heroService.getAll().subscribe(heroes => {
      this.heroes = heroes;
      this.filteredHeroes = this.form.controls['hero'].valueChanges
        .pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : '')),
          map(name => this.helpersService.filterByName<Hero>(name, this.heroes)),
        );
    });
  }

  getArtifacts() {
    this.artifactService.getAll().subscribe(artifacts => {
      this.artifacts = artifacts;
      this.filteredArtifacts = this.form.controls['artifact'].valueChanges
        .pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : '')),
          map(name => this.helpersService.filterByName<Artifact>(name || '', this.artifacts)),
        );
    });
  }

  save() {
    let heroFound = false;
    if (this.f['hero'].value && this.f['hero'].value.name) {
      heroFound = this.heroes.find(hero => hero.name.toLowerCase() == this.f['hero'].value.name.toLowerCase()) != undefined;
    }

    let ArtifactFound = false;
    if (this.f['artifact'].value && this.f['artifact'].value.name) {
      ArtifactFound = this.artifacts.find(artifact => artifact.name.toLowerCase() == this.f['artifact'].value.name.toLowerCase()) != undefined;
    }

    if (!heroFound || this.form.invalid) {
      this.f['hero'].setErrors({ invalid: 'Please select a hero' });
      return;
    }

    if (!ArtifactFound) {
      this.f['artifact'].setValue(null);
      this.f['artifactLevel'].setValue(-1);
    }

    if (!this.data) {
      this.hero.id = this.helpersService.createUuid();
    }

    this.hero.name = this.form.controls['hero'].value.name;
    this.hero.code = this.form.controls['hero'].value.code;
    this.hero.class = this.form.controls['hero'].value.class;
    this.hero.element = this.form.controls['hero'].value.element;
    this.hero.grade = this.form.controls['hero'].value.grade;
    this.hero.level = this.form.controls['level'].value;
    this.hero.status = this.form.controls['status'].value;
    this.hero.tags = this.form.controls['tags'].value;
    this.hero.skills = this.form.controls['skills'].value;
    this.hero.awakening = this.form.controls['awakening'].value;
    this.hero.imprint = this.form.controls['imprint'].value;
    if (this._hasSpecialtyChange(this.hero)) {
      this.hero.tree = this.form.controls['tree'].value;
    } else {
      this.hero.tree = null;
    }
    if (ArtifactFound) {
      this.hero.artifact = this.form.controls['artifact'].value;
      if (this.hero.artifact != null && this.form.controls['artifactLevel'].value >= 0) {
        this.hero.artifact.level = this.form.controls['artifactLevel'].value;
      }
    }

    this.dialogRef.close(this.hero);
  }

  onTagRemoved(tag: string) {
    const tags = this.f['tags'].value as string[];
    this.helpersService.removeOneItem(tags, tag);
    this.f['tags'].setValue(tags);
  }

  displayByName(option: Hero | Artifact) {
    if (option != null) {
      return option.name;
    }
    return '';
  }

  selectedHero() {
    let formHero = this.form.controls['hero'].value;
    if (formHero == null) {
      this.hero = {} as Hero;
      return;
    }

    if (formHero.name == undefined) {
      formHero = this.heroes.find(hero => hero.name.toLowerCase() == formHero.toLowerCase());
    } else {
      formHero = this.heroes.find(hero => hero.name.toLowerCase() == formHero.name.toLowerCase());
    }

    if (!formHero) {
      this.hero = {} as Hero;
      this.imprints = [];
      this.showTree = false;
      this.disableArtifactForm();
      return;
    }
    this.hero = formHero;

    this.form.controls['hero'].setValue(this.hero);
    this.form.controls['level'].setValue(60);

    if (this._hasSpecialtyChange(this.hero)) {
      this.showTree = true;
    } else {
      this.showTree = false;
    }

    switch (this.hero.grade) {
      case 5:
        this.imprints = ['B', 'A', 'S', 'SS', 'SSS'];
        break;
      case 4:
        this.imprints = ['C', 'B', 'A', 'S', 'SS', 'SSS'];
        break;
      default:
        this.imprints = ['D', 'C', 'B', 'A', 'S', 'SS', 'SSS'];
        break;
    }

    this.enableArtifactForm();
    this.form.controls['artifact'].setValue(null);
    this.form.controls['artifactLevel'].setValue(-1);
    this.form.controls['imprint'].setValue('none');
    this.form.controls['tree'].setValue(null);

    this.filteredArtifacts = this.filteredArtifacts.pipe(
      map(artifacts => {
        let auxArtifacts = [] as Artifact[];
        if (this.hero.class) {
          auxArtifacts = artifacts.filter(artifact => artifact.class == this.hero.class.toUpperCase());
        }

        auxArtifacts = auxArtifacts.concat(artifacts.filter(artifact => artifact.class == 'GENERIC'));
        auxArtifacts.sort((a, b) => a.name.localeCompare(b.name));
        return auxArtifacts;
      }),
    );
  }

  selectedHeroLevel() {
    let level = this.form.controls['level'].value;

    switch (level) {
      case 50:
        this.awakenings = [0, 1, 2, 3, 4, 5];
        break;
      default:
        this.awakenings = [0, 1, 2, 3, 4, 5, 6];
        break;
    }
  }

  selectedArtifact() {
    const lastIndex = this.artifactLevel.length - 1;

    let formArtifact = this.form.controls['artifact'].value;
    if (formArtifact == null) return;

    if (formArtifact.name == undefined) {
      formArtifact = this.artifacts.find(artifact => artifact.name.toLowerCase() == formArtifact.toLowerCase());
    } else {
      formArtifact = this.artifacts.find(artifact => artifact.name.toLowerCase() == formArtifact.name.toLowerCase());
    }

    if (!formArtifact) {
      this.form.controls['artifactLevel'].setValue(-1);
      this.form.controls['artifactLevel'].disable();
      return;
    }
    this.enableArtifactForm();
    this.hero.artifact = formArtifact;

    this.form.controls['artifact'].setValue(this.hero.artifact);
    this.form.controls['artifactLevel'].setValue(this.artifactLevel[lastIndex]);
  }

  enableArtifactForm() {
    this.form.controls['artifact'].enable();
    this.form.controls['artifactLevel'].enable();
  }

  disableArtifactForm() {
    this.form.controls['artifact'].setValue(null);
    this.form.controls['artifactLevel'].setValue(-1);
    this.form.controls['artifact'].disable();
    this.form.controls['artifactLevel'].disable();
  }

  private _hasSpecialtyChange(hero: Hero) {
    if (hero.code.includes('c40')) {
      return true;
    }
    return false;
  }
}
