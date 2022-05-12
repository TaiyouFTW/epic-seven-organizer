import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogHero } from 'src/app/_shared/interfaces/dialogHero';
import { BuildHero } from 'src/app/_shared/interfaces/hero';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddHeroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogHero,
  ) { }

  ngOnInit(): void {
  }

  add(hero: BuildHero) {
    this.dialogRef.close(hero);
  }

  // form!: FormGroup;
  // @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  // filteredHeroes!: Observable<Hero[]>;
  // filteredArtifacts!: Observable<Artifact[]>;

  // matcher = new MyErrorStateMatcher();
  // submitted = new SubmittedForm();

  // tags: string[] = [];
  // buildStatus: string[] = [];

  // selectedHeroes: BuildHero[] = [];

  // constructor(
  //   public dialogRef: MatDialogRef<AddHeroComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: DialogHero,
  //   private formBuilder: FormBuilder,
  //   private helpersService: HelpersService
  // ) {

  //   this.tags = this.helpersService.getTags;
  //   this.buildStatus = this.helpersService.getBuildStatus;

  //   this.form = this.formBuilder.group({
  //     heroList: [null, Validators.required],
  //     heroLevel: [0],
  //     skillsLevel: [0],
  //     artifactList: [null],
  //     artifactLevel: [0],
  //     imprint: [null],
  //     tags: [null],
  //     awakening: [0],
  //     status: ['Not builded'],
  //     // exclusiveEquipment: [false],
  //   });

  //   this.dialogRef.afterOpened().subscribe(() => {
  //     if (data.hero) {
  //       this.form.controls['heroList'].setValue(data.hero);
  //       this.form.controls['heroLevel'].setValue(data.hero.level);
  //       this.form.controls['skillsLevel'].setValue(data.hero.skillsLevel);
  //       this.form.controls['imprint'].setValue(data.hero.imprint);
  //       this.form.controls['tags'].setValue(data.hero.tags);
  //       this.form.controls['awakening'].setValue(data.hero.awakening);
  //       this.form.controls['status'].setValue(data.hero.buildStatus);
  //     }
  //   });

  //   this.f['artifactList'].disable();
  //   this.f['artifactLevel'].disable();
  //   this.f['imprint'].disable();
  // }

  // get f() { return this.form.controls; }

  // ngOnInit(): void {
  //   this.filteredHeroes = this.form.controls['heroList'].valueChanges.pipe(
  //     startWith(''),
  //     map(value => (typeof value === 'string' ? value : '')),
  //     map(name => (name ? this._filterHero(name) : this.data.heroes.slice())),
  //   );

  //   this.filteredArtifacts = this.form.controls['artifactList'].valueChanges.pipe(
  //     startWith(''),
  //     map(value => (typeof value === 'string' ? value : '')),
  //     map(name => (name ? this._filterArtifact(name) : this.data.artifacts.slice())),
  //   );
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['heroes'] != undefined && changes['heroes'].firstChange) {
  //     this.filteredHeroes = this.form.controls['heroList'].valueChanges.pipe(
  //       startWith(''),
  //       map(value => (typeof value === 'string' ? value : '')),
  //       map(name => (name ? this._filterHero(name) : this.data.heroes.slice())),
  //     );
  //   }

  //   if (changes['artifacts'] != undefined && changes['artifacts'].firstChange) {
  //     this.filteredArtifacts = this.form.controls['artifactList'].valueChanges.pipe(
  //       startWith(''),
  //       map(value => (typeof value === 'string' ? value : '')),
  //       map(name => (name ? this._filterArtifact(name) : this.data.artifacts.slice())),
  //     );
  //   }
  // }

  // add() {
  //   let field: BuildHero = {} as BuildHero;
  //   if (this.form.valid && field.code != '') {
  //     field.name = this.f['heroList'].value.name;
  //     field.attributeCode = this.f['heroList'].value.attributeCode;
  //     field.code = this.f['heroList'].value.code;
  //     field.jobCode = this.f['heroList'].value.jobCode;
  //     field.grade = this.f['heroList'].value.grade;
  //     field.tags = this.f['tags'].value;
  //     field.level = this.f['heroLevel'].value;
  //     field.skillsLevel = this.f['skillsLevel'].value;
  //     field.artifact = this.f['artifactList'].value;
  //     field.artifactLevel = this.f['artifactLevel'].value;
  //     field.imprint = this.f['imprint'].value;
  //     field.awakening = this.f['awakening'].value;
  //     field.buildStatus = this.f['status'].value;
  //     this.formRef.resetForm();
  //     this.dialogRef.close(field);
  //   }
  // }

  // update() {
  //   let field: BuildHero = {} as BuildHero;
  //   if (this.form.valid && field.code != '') {
  //     field.name = this.f['heroList'].value.name;
  //     field.attributeCode = this.f['heroList'].value.attributeCode;
  //     field.code = this.f['heroList'].value.code;
  //     field.jobCode = this.f['heroList'].value.jobCode;
  //     field.grade = this.f['heroList'].value.grade;
  //     field.tags = this.f['tags'].value;
  //     field.level = this.f['heroLevel'].value;
  //     field.skillsLevel = this.f['skillsLevel'].value;
  //     field.artifact = this.f['artifactList'].value;
  //     field.artifactLevel = this.f['artifactLevel'].value;
  //     field.imprint = this.f['imprint'].value;
  //     field.awakening = this.f['awakening'].value;
  //     field.buildStatus = this.f['status'].value;
  //     this.formRef.resetForm();
  //     this.dialogRef.close(field);
  //   }
  // }

  // setHero() {
  //   if (this.f['heroList'].value) {
  //     let filterValue = this._setFilterValue('heroList');

  //     this.f['heroList'].setValue(this.data.heroes.filter(option => {
  //       let value = option.name.toLowerCase() == filterValue;
  //       if (value) {
  //         this.f['artifactList'].enable();
  //         this.f['imprint'].setValue(null);
  //         this.f['imprint'].enable();
  //       }
  //       return value;
  //     })[0]);

  //   } else {
  //     this.f['artifactList'].setValue(null);
  //     this.f['artifactList'].disable();
  //     this.f['imprint'].setValue(null);
  //     this.f['imprint'].disable();
  //   }
  // }

  // setArtifact() {
  //   if (this.f['artifactList'].value) {
  //     let filterValue = this._setFilterValue('artifactList');

  //     this.f['artifactList'].setValue(this.data.artifacts.filter(option => {
  //       let value = option.name.toLowerCase() == filterValue;
  //       if (value) {
  //         this.f['artifactLevel'].enable();
  //       }
  //       return value;
  //     })[0]);
  //   } else {
  //     this.f['artifactLevel'].setValue(null);
  //     this.f['artifactLevel'].disable();
  //   }
  // }

  // onTagRemoved(tag: string) {
  //   const tags = this.f['tags'].value as string[];
  //   this._removeFirst(tags, tag);
  //   this.f['tags'].setValue(tags);
  // }

  // getPortraitName(hero: Hero) {
  //   return hero && hero.name ? hero.name : '';
  // }

  // normalizeJobCode(jobCode: string) {
  //   return this.helpersService.fixJobCode(jobCode);
  // }

  // private _removeFirst<T>(array: T[], toRemove: T): void {
  //   const index = array.indexOf(toRemove);
  //   if (index !== -1) {
  //     array.splice(index, 1);
  //   }
  // }

  // private _setFilterValue(formName: string) {
  //   if (this.f[formName].value && this.f[formName].value.name) {
  //     return this.f[formName].value.name.toLowerCase();
  //   } else {
  //     return this.f[formName].value.toLowerCase();
  //   }
  // }

  // private _filterHero(value: string): Hero[] {
  //   const filterValue = value.toLowerCase();

  //   return this.data.heroes.filter(option => option.name.toLowerCase().includes(filterValue));
  // }

  // private _filterArtifact(value: string): Artifact[] {
  //   const filterValue = value.toLowerCase();

  //   return this.data.artifacts.filter(option => option.name.toLowerCase().includes(filterValue));
  // }
}
