import { Component, Inject, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../interfaces/hero';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HelpersService } from '../../services/helpers.service';
import { HeroService } from '../../services/hero.service';
import { ArtifactService } from '../../services/artifact.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Artifact } from '../../interfaces/artifact';
import { HeroPoolService } from '../../services/hero-pool.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { map, startWith } from 'rxjs';
import { BasicPortraitComponent } from "../portraits/basic-portrait/basic-portrait.component";

@Component({
  selector: 'app-hero-form',
  standalone: true,
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatAutocompleteModule, MatSelectModule, MatButtonModule, MatInputModule, BasicPortraitComponent, MatDialogModule]
})
export class HeroFormComponent {

  helpersService = inject(HelpersService);
  heroService = inject(HeroService);
  artifactService = inject(ArtifactService);
  heroPoolService = inject(HeroPoolService);

  tags: string[] = this.helpersService.tags().slice(1);
  status: string[] = this.helpersService.status();
  artifactLevel: number[] = this.helpersService.thirtyNumbers();
  skills: number[] = this.helpersService.thirtyNumbers().slice(0, 16);
  awakenings: number[] = this.helpersService.thirtyNumbers().slice(0, 7);
  trees: number[] = this.helpersService.thirtyNumbers();
  imprints: string[] = [];

  hero: Hero = {} as Hero;

  form!: FormGroup;
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  showTree: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<HeroFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {

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
      this.hero = data;
      this.form.patchValue(data);
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
        this.f['artifact'].setValue(data.artifact);
        this.f['artifactLevel'].setValue(data.artifact.level);
        this.selectedArtifact();
      }
    }
  }

  get f() { return this.form.controls; }

  getHeroes() {
    this.heroService.getAll();
    let heroName = this.form.controls['hero'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? name : '';
      })
    );
    heroName.subscribe(value => this.heroService.filterByName.set(value));
  }

  getArtifacts() {
    this.artifactService.getAll();
    let artifactName = this.form.controls['artifact'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? name : '';
      })
    );
    artifactName.subscribe(value => this.artifactService.filterByName.set(value));
  }

  save() {
    let heroFound = false;
    if (this.f['hero'].value && this.f['hero'].value.name) {
      heroFound = this.heroService.list().find(hero => hero.name.toLowerCase() == this.f['hero'].value.name.toLowerCase()) != undefined;
    }

    let artifactFound = false;
    if (this.f['artifact'].value && this.f['artifact'].value.name) {
      artifactFound = this.artifactService.list().find(artifact => artifact.name.toLowerCase() == this.f['artifact'].value.name.toLowerCase()) != undefined;
    }

    if (!heroFound || this.form.invalid) {
      this.f['hero'].setErrors({ invalid: 'Please select a hero' });
      return;
    }

    if (!artifactFound) {
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
    if (artifactFound) {
      this.hero.artifact = this.form.controls['artifact'].value;
      if (this.hero.artifact != null && this.form.controls['artifactLevel'].value >= 0) {
        this.hero.artifact.level = this.form.controls['artifactLevel'].value;
      }
    }

    if (this.heroPoolService.find(this.hero) != undefined) {
      this.heroPoolService.update(this.hero);
    } else {
      this.heroPoolService.add(this.hero);
    }

    this.dialogRef.close(true);
  }

  selectedHero() {
    let formHero = this.form.controls['hero'].value;
    if (formHero == null) {
      this.hero = {} as Hero;
      return;
    }

    if (formHero.name == undefined) {
      formHero = this.heroService.list().find(hero => hero.name.toLowerCase() == formHero.toLowerCase());
    }

    if (!formHero) {
      this.hero = {} as Hero;
      this.imprints = [];
      this.showTree = false;
      this.disableArtifactForm();
      return;
    }

    if (this.hero.code != formHero.code) {
      this.form.controls['artifact'].setValue(null);
      this.form.controls['artifactLevel'].setValue(-1);
      this.form.controls['tree'].setValue(null);
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
        this.imprints = this.helpersService.imprints().slice(2);
        break;
      case 4:
        this.imprints = this.helpersService.imprints().slice(1);
        break;
      default:
        this.imprints = this.helpersService.imprints();
        break;
    }

    this.enableArtifactForm();

    this.artifactService.filterByClass.set(this.hero.class);
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
      formArtifact = this.artifactService.list().find(artifact => artifact.name.toLowerCase() == formArtifact.toLowerCase());
    } else {
      formArtifact = this.artifactService.list().find(artifact => artifact.name.toLowerCase() == formArtifact.name.toLowerCase());
    }

    if (!formArtifact) {
      this.form.controls['artifactLevel'].setValue(-1);
      this.form.controls['artifactLevel'].disable();
      return;
    }
    this.enableArtifactForm();
    this.hero.artifact = formArtifact;

    this.form.controls['artifact'].setValue(this.hero.artifact);
    if (this.hero.artifact && this.hero.artifact.level == -1) {
      this.form.controls['artifactLevel'].setValue(this.artifactLevel[lastIndex]);
    }
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

  displayByName(option: Hero | Artifact) {
    if (option != null) {
      return option.name;
    }
    return '';
  }

  private _hasSpecialtyChange(hero: Hero) {
    if (hero.code.includes('c40')) {
      return true;
    }
    return false;
  }
}
