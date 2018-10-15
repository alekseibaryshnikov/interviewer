import { Injectable } from '@angular/core';
import { FormElementModel } from '../models/form-element.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  _formElements: FormElementModel[] = [];

  // Editor observable
  _previewForm = new BehaviorSubject(<FormElementModel[]>[]);
  previewForm = this._previewForm.asObservable();

  // Production observable
  _productionForm = new BehaviorSubject(<FormElementModel[]>[]);
  productionForm = this._productionForm.asObservable();

  _localStorage = window.localStorage;
  _productionFormName = 'productionForm';

  constructor() {
    const savedForm = this._localStorage.getItem(this._productionFormName);
    if (savedForm) {
      this._productionForm.next(JSON.parse(savedForm));
    }
  }

  onAddFormElement(inElement: FormElementModel): string | number {
    const isExist = this._formElements.find(element => {
      return element.name === inElement.name && element.type === inElement.type;
    });

    if (isExist) {
      return `Element with this name "${isExist.name}" and type "${
        isExist.type
      }" already exist!`;
    } else {
      this._formElements.push(inElement);
      this._previewForm.next(this._formElements);
      return 0;
    }
  }

  /**
   * Add variant into select or radio form element
   * @param inElement incoming element
   * @param inVariant incoming element variant
   */
  onAddVariant(
    inElement: FormElementModel,
    inVariant: FormElementModel
  ): string | number {
    const radio = this._formElements.find(element => {
      return element.id === inElement.id;
    });

    if (!radio) {
      return `Cant find radio group ${inElement.label}!`;
    }

    const isExistVariant = radio.variants.find(variant => {
      return variant.name === inVariant.name;
    });

    if (isExistVariant) {
      return `Element with this name "${isExistVariant.name}" already exist!`;
    }

    radio.variants.push(inVariant);
    this._previewForm.next(this._formElements);
    return 0;
  }

  /**
   * Edit variant in select or radio from element
   * @param inVariant incoming variant
   */
  onEditVariant(inVariant: FormElementModel) {
    const formElement = this._formElements.find(el => {
      return el.id === inVariant.parent;
    });

    if (formElement) {
      formElement.variants.map(variant => {
        if (variant.id === inVariant.id) {
          variant = inVariant;
          return variant;
        }
      });

      this._previewForm.next(this._formElements);
    }
  }

  /**
   * Remove one variant from select or radio form element
   * @param inVariant incoming variant
   */
  onRemoveVariant(inVariant: FormElementModel) {
    this._formElements.map(formElement => {
      if (formElement.id === inVariant.parent) {
        formElement.variants = formElement.variants.filter(variant => {
          return inVariant.id !== variant.id;
        });
        return formElement;
      }
    });

    this._previewForm.next(this._formElements);
  }

  onRemoveElement(inElement: FormElementModel) {
    this._formElements = this._formElements.filter(arrElement => {
      return inElement.id !== arrElement.id;
    });

    this._previewForm.next(this._formElements);
  }

  /**
   * Move element above or below in form view
   * @param inElement incoming element
   * @param direction move up or bottom
   */
  onMoveElement(inElement: FormElementModel, direction: string) {
    const index = this._formElements.findIndex(element => {
      return inElement.id === element.id;
    });

    if (direction === 'up') {
      if (this._formElements[index - 1]) {
        this._formElements[index] = this._formElements[index - 1];
        this._formElements[index - 1] = inElement;
      } else {
        this._formElements[index] = this._formElements[
          this._formElements.length - 1
        ];
        this._formElements[this._formElements.length - 1] = inElement;
      }
    } else if (direction === 'down') {
      if (this._formElements[index + 1]) {
        this._formElements[index] = this._formElements[index + 1];
        this._formElements[index + 1] = inElement;
      } else {
        this._formElements[index] = this._formElements[0];
        this._formElements[0] = inElement;
      }
    }

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

  /**
   * Set required or not for form element
   * @param inElement incoming element
   * @param status incoming status
   */
  onChangeRequired(inElement: FormElementModel, status: boolean) {
    this._formElements.map(element => {
      if (inElement.id === element.id) {
        if (status) {
          element.required = true;
        } else {
          element.required = false;
        }
      }
      return element;
    });
  }

  onSaveForm() {
    this._localStorage.removeItem(this._productionFormName);

    const compileForm = JSON.stringify(this._formElements);
    this._localStorage.setItem(this._productionFormName, compileForm);
    this._productionForm.next(JSON.parse(compileForm));
  }

  onRequestForm() {
    const savedForm = this._localStorage.getItem(this._productionFormName);
    if (savedForm) {
      this._productionForm.next(JSON.parse(savedForm));
    } else {
      this._productionForm.next([]);
    }
  }

  onDeleteForm() {
    this._formElements = [];
    this._previewForm.next(this._formElements);
  }

  onClearCache() {
    this._localStorage.removeItem(this._productionFormName);
    this._productionForm.next([]);
  }

  onLoadFromCache() {
    const storage = this._localStorage.getItem(this._productionFormName);
    if (storage) {
      this._formElements = JSON.parse(storage);
      this._previewForm.next(this._formElements);
    }
  }

  getCountOfElements() {
    return this._formElements.length;
  }
}
