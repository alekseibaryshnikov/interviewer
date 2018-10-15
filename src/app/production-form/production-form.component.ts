import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../shared/services/storage.service';
import { Observable } from 'rxjs';
import { FormElementModel } from '../shared/models/form-element.model';

@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.scss']
})
export class ProductionFormComponent implements OnInit {
  formElements$: Observable<FormElementModel[]>;
  form;

  constructor(private _storageService: StorageService) {}

  ngOnInit() {
    this.formElements$ = this._storageService.productionForm.pipe();
    this.formElements$.subscribe(formElements => {
      const formsElementsControl = <any>{};
      formElements.forEach(formElement => {
        formsElementsControl[formElement.name] = new FormControl('');
      });
      this.form = new FormGroup(formsElementsControl);
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.form.value);
  }
}
