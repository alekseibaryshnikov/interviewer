import { Injectable } from '@angular/core';
import { FormElementModel } from '../models/form-element.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private _storageName = 'formElements';
  private _arrayDB: FormElementModel[] = [];

  constructor() {}

  onAddElement(formElement: FormElementModel) {
    const storage = localStorage.getItem(this._storageName);
    
    if (!storage) {
      this._arrayDB.push(formElement);
      localStorage.setItem('formElements', JSON.stringify(this._arrayDB));
    } else {
      this._arrayDB = JSON.parse(storage);
      this._arrayDB.push(formElement);
      this._reloadStorage();
    }

    this._arrayDB = [];
  }

  onDeleteElement(id: number) {
    const storage = localStorage.getItem(this._storageName);

    if (storage) {
      this._arrayDB = JSON.parse(storage);
      this._arrayDB.filter(item => {
        return item.id !== id;
      });
      this._reloadStorage();
      return true;
    } else {
      console.error(`Storage key '${this._storageName}' has been not found!`);
      return false;
    }
  }

  onClearCache() {
    if (localStorage.getItem(this._storageName)){
      localStorage.removeItem(this._storageName);
    }
  }

  private _reloadStorage() {
    localStorage.removeItem(this._storageName);
    localStorage.setItem(this._storageName, JSON.stringify(this._arrayDB));
  }
}
