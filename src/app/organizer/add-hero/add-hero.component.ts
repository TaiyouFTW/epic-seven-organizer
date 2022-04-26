import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { map, Observable, startWith } from 'rxjs';
// import { Heroz } from 'src/app/_shared/interfaces/heroes';
import { BuildHero, Hero } from 'src/app/_shared/interfaces/hero';

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
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }]
})
export class AddHeroComponent implements OnInit, OnChanges {

  @Input() heroes: Hero[] = [];
  // @Input() unknown: Heroz = {} as Heroz;

  @Output() heroEvent = new EventEmitter<BuildHero>();

  form!: FormGroup;
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  filteredHeroes!: Observable<Hero[]>;

  matcher = new MyErrorStateMatcher();
  submitted = new SubmittedForm();

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      autocomplete: [null, Validators.required],
      level: [null, Validators.required],
      build: [null, Validators.required],
    });
  }

  get f() { return this.form.controls; }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['heroes'] != undefined && changes['heroes'].firstChange) {
      this.filteredHeroes = this.form.controls['autocomplete'].valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : console.log(value))),
        map(name => (name ? this._filter(name) : this.heroes.slice())),
      );
    }
  }

  add() {
    let field: BuildHero = this.f['autocomplete'].value;
    if (this.form.valid && field.code != '') {
      field.buildStatus = this.f['build'].value;
      field.level = this.f['level'].value;
      this.formRef.resetForm();
      this.heroEvent.emit(field);
    }
  }

  changeHero() {
    console.log(this.f['autocomplete'].value);
  }

  getPortraitName(hero: Hero) {
    return hero && hero.name ? hero.name : '';
  }

  private _filter(value: string): Hero[] {
    const filterValue = value.toLowerCase();

    return this.heroes.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
