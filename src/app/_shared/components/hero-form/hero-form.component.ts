import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  form!: FormGroup;
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  constructor(
    private dialogRef: MatDialogRef<HeroFormComponent>,
    private formBuilder: FormBuilder,
    private helpersService: HelpersService,
    private heroService: HeroService,
    private artifactService: ArtifactService
  ) {
    // FIXME: Need logic if is for edit a hero
    this.hero = {} as Hero;

    this.tags = ['PVP', 'PVE', 'Wyvern', 'Golem', 'Banshee', 'Azimanak', 'Caides', 'Expedition', 'LAB'];
    this.status = ['Not Builded', 'Need Fix', 'Ok', 'Best'];
    this.artifactLevel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

    this.form = this.formBuilder.group({
      hero: [null, Validators.required],
      level: [0],
      artifact: [null],
      artifactLevel: [-1],
      status: ['Not builded'],
      tags: [null]
    });
    this.disableArtifactForm();

    this.getHeroes();
    this.getArtifacts();

    // TODO: add a logic to populate only when is a hero to edit
    // this.form.patchValue(this.hero);
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.filteredHeroes = this.form.controls['hero'].valueChanges
      .pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : '')),
        map(name => this.helpersService.filterByName<Hero>(name, this.heroes)),
      );

    this.filteredArtifacts = this.form.controls['artifact'].valueChanges
      .pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : '')),
        map(name => this.helpersService.filterByName<Artifact>(name || '', this.artifacts)),
      );
  }

  getHeroes() {
    this.heroService.getAll().subscribe(heroes => this.heroes = heroes);
  }

  getArtifacts() {
    this.artifactService.getAll().subscribe(artifacts => this.artifacts = artifacts);
  }

  save() {
    const heroFound = this.heroes.find(hero => hero == this.f['hero'].value) != undefined;
    const ArtifactFound = this.artifacts.find(artifact => artifact == this.f['artifact'].value) != undefined;

    if (!heroFound || this.form.invalid) {
      this.f['hero'].setErrors({ invalid: 'Please select a hero' });
      return;
    }
    if (!ArtifactFound) {
      this.f['artifact'].setValue(null);
      this.f['artifactLevel'].setValue(-1);
    }
    this.hero.id = '';
    this.hero.name = this.form.controls['hero'].value.name;
    this.hero.code = this.form.controls['hero'].value.code;
    this.hero.class = this.form.controls['hero'].value.class;
    this.hero.element = this.form.controls['hero'].value.element;
    this.hero.level = this.form.controls['level'].value;
    this.hero.status = this.form.controls['status'].value;
    this.hero.tags = this.form.controls['tags'].value;
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

  selectedHero(eventHero: Hero) {
    this.hero = eventHero;
    this.form.controls['hero'].setValue(eventHero);
    this.form.controls['level'].setValue(60);

    if (!this.heroes.find(hero => hero == eventHero)) {
      this.disableArtifactForm();
      return;
    }
    this.enableArtifactForm();

    this.form.controls['artifact'].setValue(null);
    this.form.controls['artifactLevel'].setValue(-1);

    this.filteredArtifacts = this.filteredArtifacts.pipe(
      map(artifacts => artifacts.filter(artifact => artifact.class == this.hero.class.toUpperCase() || artifact.class == 'GENERIC')),
    );
  }

  selectedArtifact(eventArtifact: Artifact) {
    const lastIndex = this.artifactLevel.length - 1;

    this.hero.artifact = eventArtifact;
    this.form.controls['artifact'].setValue(eventArtifact);
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
}
