import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Artifact } from 'src/app/_shared/interfaces/artifact';
// import { Heroz } from 'src/app/_shared/interfaces/heroes';
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

export interface DialogData {
  heroes: Hero[];
  artifacts: Artifact[];
}

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }]
})
export class AddHeroComponent implements OnInit, OnChanges {

  // @Input() heroes: Hero[] = [];
  // @Input() artifacts: Artifact[] = [];

  // @Output() heroEvent = new EventEmitter<BuildHero>();

  form!: FormGroup;
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  filteredHeroes!: Observable<Hero[]>;
  filteredArtifacts!: Observable<Artifact[]>;

  matcher = new MyErrorStateMatcher();
  submitted = new SubmittedForm();

  constructor(
    public dialogRef: MatDialogRef<AddHeroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private helpersService: HelpersService
  ) {

    this.form = this.formBuilder.group({
      heroList: [null, Validators.required],
      heroLevel: [null, Validators.required],
      skillsLevel: [0],
      artifactList: [null],
      artifactLevel: [0],
      exclusiveEquipment: [false],
      status: [null, Validators.required],
    });

    this.f['artifactList'].disable();
    this.f['artifactLevel'].disable();
  }

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.filteredHeroes = this.form.controls['heroList'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : '')),
      map(name => (name ? this._filterHero(name) : this.data.heroes.slice())),
    );

    this.filteredArtifacts = this.form.controls['artifactList'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : '')),
      map(name => (name ? this._filterArtifact(name) : this.data.artifacts.slice())),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  add() {
    let field: BuildHero = this.f['heroList'].value;
    if (this.form.valid && field.code != '') {
      field.buildStatus = this.f['status'].value;
      field.level = this.f['heroLevel'].value;
      field.skillsLevel = this.f['skillsLevel'].value;
      field.artifact = this.f['artifactList'].value;
      field.artifactLevel = this.f['artifactLevel'].value;
      field.hasExclusiveEquipment = this.f['exclusiveEquipment'].value;
      // equipment
      // set
      this.formRef.resetForm();
      this.dialogRef.close(field);
    }
  }

  setHero() {
    if (this.f['heroList'].value) {
      let filterValue = this._setFilterValue('heroList');

      this.f['heroList'].setValue(this.data.heroes.filter(option => {
        let value = option.name.toLowerCase() == filterValue;
        if (value) {
          this.f['artifactList'].enable();
        }
        return value;
      })[0]);

    } else {
      this.f['artifactList'].setValue(null);
      this.f['artifactList'].disable();
    }
  }

  setArtifact() {
    if (this.f['artifactList'].value) {
      let filterValue = this._setFilterValue('artifactList');

      this.f['artifactList'].setValue(this.data.artifacts.filter(option => {
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

  getPortraitName(hero: Hero) {
    return hero && hero.name ? hero.name : '';
  }

  normalizeJobCode(jobCode: string) {
    return this.helpersService.fixJobCode(jobCode);
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

    return this.data.heroes.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterArtifact(value: string): Artifact[] {
    const filterValue = value.toLowerCase();

    return this.data.artifacts.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
