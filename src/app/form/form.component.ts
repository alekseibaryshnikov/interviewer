import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild
} from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { FormElementModel } from '../shared/models/form-element.model';
import { Observable } from 'rxjs';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { HostDirective } from '../shared/directives/host.directive';
import { DynamicComponent } from '../shared/models/dynamic-component';
import { ComponentTypes } from '../shared/models/component-types';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formElements$: Observable<FormElementModel[]>;

  private _elementTypes: ComponentTypes[] = [
    { type: 'inputField', component: InputComponent },
    { type: 'textarea', component: TextareaComponent },
    { type: 'checkbox', component: CheckboxComponent },
    { type: 'radioButton', component: RadioComponent },
    { type: 'select', component: SelectComponent },
    { type: 'inputFile', component: InputComponent }
  ];

  @ViewChild(HostDirective)
  host: HostDirective;

  constructor(
    private _storageService: StorageService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    let viewContainerRef = this.host.viewContainerRef;

    this._storageService.previewForm.subscribe(formEelements => {
      viewContainerRef.clear();
      
      formEelements.forEach(formElement => {
        const componentType = this._elementTypes.find(element => {
          return element.type === formElement.type;
        });

        if (componentType) {
          let componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType.component);
          let componentRef = viewContainerRef.createComponent(componentFactory);
          (<DynamicComponent>componentRef.instance).data = formElement;
        } else {
          console.error('Cant find cmponent type with name ' + formElement.type);
        }
      });
    });
  }

  onAddFormElement(elementType: string) {
    let formElement = this._elementTypes.find(el => el.type === elementType);
    formElement = formElement ? formElement : { type: 'inputField', component: InputComponent };

    const newComponent = this._makeDefaultComponentData(formElement.type);
    const result = this._storageService.onAddFormElement(newComponent);
    if (result !== 0) {
      alert(result);
    }
  }

  private _makeDefaultComponentData(type: string): FormElementModel {
    const id = Date.now();
    return {
      id,
      type,
      label: 'Default label',
      name: `form_element_${type}_${id}`
    };
  }
}
