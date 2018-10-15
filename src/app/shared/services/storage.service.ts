import { Injectable } from '@angular/core';
import { FormElementModel } from '../models/form-element.model';
import { BehaviorSubject } from 'rxjs';
import { element } from '@angular/core/src/render3/instructions';

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
   * Add variant into radio button group or select
   *
   * @param {FormElementModel} inElement
   * @param {FormElementModel} radioElement
   * @memberof StorageService
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
   * Need for sorting form elements
   *
   * @param {FormElementModel} inElement
   * @param {string} direction
   * @memberof StorageService
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

  /**
   * When doubleclick and editing label
   *
   * @param {FormElementModel} inElement
   * @memberof StorageService
   */
  onEditElement(inElement: FormElementModel) {
    this._formElements = this._formElements.map(element => {
      if (inElement.id === element.id) {
        element = inElement;
      }
      return element;
    });
  }

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

  onUploadProduction() {
    this._productionForm.next(this._formElements);
  }

  onDeleteForm() {
    this._formElements = [];
    this._previewForm.next(this._formElements);
  }

  getCountOfElements() {
    return this._formElements.length;
  }
}
