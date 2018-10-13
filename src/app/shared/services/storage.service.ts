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

  onAddFormElement(inElement: FormElementModel): string | number {
    const isExist = this._formElements.find(element => {
      return element.name === inElement.name && element.type === inElement.type;
    });

    if (isExist) {
      return `Element with this name "${isExist.name}" and type "${isExist.type}" already exist!`;
    } else {
      this._formElements.push(inElement);
      this._previewForm.next(this._formElements);
      return 0;
    }
  }

  onRemoveElement(inElement: FormElementModel) {
    this._formElements = this._formElements.filter(arrElement => {
      return inElement.id !== arrElement.id;
    });

    // Need for creating indexes to avoid possible collisions
    let i = 0;
    this._formElements = this._formElements.map(element => {
      element.id = ++i;
      return element;
    });

    this._previewForm.next(this._formElements);
  }

  onEditElement(inElement: FormElementModel) {
    this._formElements = this._formElements.map(element => {
      if (inElement.id === element.id) {
        element = inElement;
      }
      return element;
    });
  }

  onUploadProduction() {
    this._productionForm.next(this._formElements);
  }

  onDeleteForm() {
    this._previewForm.next([]);
  }

  getCountOfElements() {
    return this._formElements.length;
  }
}
