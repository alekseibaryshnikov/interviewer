import { Injectable } from '@angular/core';
import { FormElementModel } from '../models/form-element.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  _formElements: FormElementModel[] = [];

  _previewForm = new BehaviorSubject(<FormElementModel[]>[]);
  previewForm = this._previewForm.asObservable();

  _productionForm = new BehaviorSubject(<FormElementModel[]>[]);
  productionForm = this._productionForm.asObservable();

  constructor() {}

  onAddFormElement(element: FormElementModel) {
    this._formElements.push(element);
    this._previewForm.next(this._formElements);
  }

  onRemoveElement(inElement: FormElementModel) {
    this._formElements.filter(arrElement => {
      return inElement.id !== arrElement.id;
    });
  }

  onUploadProduction() {
    this._productionForm.next(this._formElements);
  }

  onDeleteForm() {
    this._previewForm.next([]);
  }
}
