import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input({ required: true }) filter!: WritableSignal<string[]>;
  @Input({ required: true }) filterFields!: WritableSignal<string[]>;

  filterForm: FormGroup = this._formBuilder.group({
    all: [false],
    fields: this._formBuilder.array([])
  });

  constructor(private _formBuilder: FormBuilder) { }

  get fields() {
    return this.filterForm.get('fields') as FormArray;
  }

  ngOnInit() {
    for (let i = 0; i < this.filterFields().length; i++) {
      let find = this.filter().find(x => x == this.filterFields()[i]);
      if (find != undefined) {
        this.fields.push(this._formBuilder.control(true));
      } else {
        this.fields.push(this._formBuilder.control(false));
      }
    }

    if (this.filter().length == 0) {
      this.setAll();
    }
  }

  setAll() {
    this.filterForm.controls['all'].setValue(true);
    this.fields.controls.forEach(control => (control.setValue(false)));
    this.emitValues();
  }

  updateAllField() {
    let allNotChecked = this.fields.controls != null && this.fields.controls.every(t => !t.value);
    if (allNotChecked) {
      this.setAll();
    } else {
      this.filterForm.controls['all'].setValue(false);
    }
    this.emitValues();
  }

  emitValues() {
    let selectedElements = [];
    if (this.filterForm.controls['all'].value) {
      this.filter.set([]);
    } else {
      for (let i = 0; i < this.fields.length; i++) {
        if (this.fields.value[i]) {
          selectedElements.push(this.filterFields()[i])
        }
      }
      if (selectedElements.length == this.fields.value.length) {
        this.filter.set([]);
      } else {
        this.filter.set(selectedElements);
      }
    }
  }
}
