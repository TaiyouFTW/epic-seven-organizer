import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { map, Observable, startWith } from 'rxjs';
import { Artifact } from 'src/app/_shared/interfaces/artifact';
import { BuildHero, Hero } from 'src/app/_shared/interfaces/hero';
import { HelpersService } from 'src/app/_shared/services/helpers.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && isSubmitted);
  }
}

export class SubmittedForm {
  isSubmitted(form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!isSubmitted;
  }
}

@Component({
  selector: 'app-form-hero',
  templateUrl: './form-hero.component.html',
  styleUrls: ['./form-hero.component.scss']
})
export class FormHeroComponent implements OnInit, OnChanges {

  @Input() hero?: BuildHero;
  @Input() heroes!: Hero[];
  @Input() artifacts!: Artifact[];

  @Output() onAdd = new EventEmitter<BuildHero>();
  @Output() onEdit = new EventEmitter<BuildHero>();

  form!: FormGroup;
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  filteredHeroes!: Observable<Hero[]>;
  filteredArtifacts!: Observable<Artifact[]>;

  matcher = new MyErrorStateMatcher();
  submitted = new SubmittedForm();

  tags: string[] = [];
  buildStatus: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private helpersService: HelpersService
  ) {

    this.tags = this.helpersService.getTags;
    this.buildStatus = this.helpersService.getBuildStatus;

    this.form = this.formBuilder.group({
      heroList: [null, Validators.required],
      heroLevel: [0],
      skillsLevel: [0],
      artifactList: [null],
      artifactLevel: [0],
      imprint: [null],
      tags: [null],
      awakening: [0],
      status: ['Not builded']
    });

    this.f['artifactList'].disable();
    this.f['artifactLevel'].disable();
    this.f['imprint'].disable();
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    // this.filteredHeroes = this.form.controls['heroList'].valueChanges.pipe(
    //   startWith(''),
    //   map(value => (typeof value === 'string' ? value : '')),
    //   map(name => (name ? this._filterHero(name) : this.heroes.slice())),
    // );

    // this.filteredArtifacts = this.form.controls['artifactList'].valueChanges.pipe(
    //   startWith(''),
    //   map(value => (typeof value === 'string' ? value : '')),
    //   map(name => (name ? this._filterArtifact(name) : this.artifacts.slice())),
    // );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hero'] != undefined && changes['hero'].firstChange) {
      this.fillForm();
    }
    if (changes['heroes'] != undefined && changes['heroes'].firstChange) {
      this.filteredHeroes = this.form.controls['heroList'].valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : '')),
        map(name => (name ? this._filterHero(name) : this.heroes.slice())),
      );
    }

    if (changes['artifacts'] != undefined && changes['artifacts'].firstChange) {
      this.filteredArtifacts = this.form.controls['artifactList'].valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : '')),
        map(name => (name ? this._filterArtifact(name) : this.artifacts.slice())),
      );
    }
  }

  fillForm() {
    if (this.hero) {
      if (this.hero.name != '') {
        this.f['artifactList'].enable();
        this.f['artifactLevel'].enable();
        this.f['imprint'].enable();
      }
      this.f['heroList'].setValue(this.hero);
      this.f['heroLevel'].setValue(this.hero.level);
      this.f['skillsLevel'].setValue(this.hero.skillsLevel);
      this.f['artifactList'].setValue(this.hero.artifact);
      this.f['artifactLevel'].setValue(this.hero.artifactLevel);
      this.f['imprint'].setValue(this.hero.imprint);
      this.f['tags'].setValue(this.hero.tags);
      this.f['awakening'].setValue(this.hero.awakening);
      this.f['status'].setValue(this.hero.buildStatus);
    }
  }

  save() {
    let field: BuildHero = {} as BuildHero;
    if (this.form.valid) {
      field.name = this.f['heroList'].value.name;
      field.attributeCode = this.f['heroList'].value.attributeCode;
      field.code = this.f['heroList'].value.code;
      field.jobCode = this.f['heroList'].value.jobCode;
      field.grade = this.f['heroList'].value.grade;
      field.tags = this.f['tags'].value;
      field.level = this.f['heroLevel'].value;
      field.skillsLevel = this.f['skillsLevel'].value;
      field.artifact = this.f['artifactList'].value;
      field.artifactLevel = this.f['artifactLevel'].value;
      field.imprint = this.f['imprint'].value;
      field.awakening = this.f['awakening'].value;
      field.buildStatus = this.f['status'].value;
      field.visible = true;
      this.formRef.resetForm();
      if (this.hero) {
        // Emit when update
        this.onEdit.emit(field);
      } else {
        // Emit when add
        this.onAdd.emit(field);
      }
    }
  }

  setHero() {
    if (this.f['heroList'].value) {
      let filterValue = this._setFilterValue('heroList');

      this.f['heroList'].setValue(this.heroes.filter(option => {
        let value = option.name.toLowerCase() == filterValue;
        if (value) {
          this.f['artifactList'].enable();
          this.f['imprint'].setValue(null);
          this.f['imprint'].enable();
        }
        return value;
      })[0]);

    } else {
      this.f['artifactList'].setValue(null);
      this.f['artifactList'].disable();
      this.f['imprint'].setValue(null);
      this.f['imprint'].disable();
    }
  }

  setArtifact() {
    if (this.f['artifactList'].value) {
      let filterValue = this._setFilterValue('artifactList');

      this.f['artifactList'].setValue(this.artifacts.filter(option => {
        let value = option.name.toLowerCase() == filterValue;
        if (value) {
          this.f['artifactLevel'].enable();
        }
        return value;
      })[0]);
    } else {
      this.f['artifactLevel'].setValue(null);
      this.f['artifactLevel'].disable();
    }
  }

  onTagRemoved(tag: string) {
    const tags = this.f['tags'].value as string[];
    this._removeFirst(tags, tag);
    this.f['tags'].setValue(tags);
  }

  getPortraitName(hero: Hero) {
    return hero && hero.name ? hero.name : '';
  }

  normalizeJobCode(jobCode: string) {
    return this.helpersService.fixJobCode(jobCode);
  }

  private _removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  private _setFilterValue(formName: string) {
    if (this.f[formName].value && this.f[formName].value.name) {
      return this.f[formName].value.name.toLowerCase();
    } else {
      return this.f[formName].value.toLowerCase();
    }
  }

  private _filterHero(value: string): Hero[] {
    const filterValue = value.toLowerCase();

    return this.heroes.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterArtifact(value: string): Artifact[] {
    const filterValue = value.toLowerCase();

    return this.artifacts.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
