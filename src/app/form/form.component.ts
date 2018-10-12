import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild
} from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { FormElementModel } from '../shared/models/form-element.model';
import { Observable } from 'rxjs';
import { element } from '@angular/core/src/render3/instructions';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { FileComponent } from './file/file.component';
import { HostDirective } from '../shared/directives/host.directive';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formElements$: Observable<FormElementModel[]>;

  elementTypes = [
    'inputField',
    'textarea',
    'checkbox',
    'radioButton',
    'select',
    'inputFile'
  ];

  @ViewChild(HostDirective)
  host: HostDirective;

  formElements = [];

  constructor(
    private _storage: StorageService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.formElements$ = this._storage.previewForm.pipe();
  }

  onAddFormElement(elementType: string) {
    let formElement = this.elementTypes.find(el => el === elementType);
    formElement = formElement ? formElement : 'inputField';

    let componentFactory;

    switch (formElement) {
      case 'inputField':
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          InputComponent
        );
        break;
      case 'textarea':
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          TextareaComponent
        );
        break;
      case 'checkbox':
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          CheckboxComponent
        );
        break;
      case 'radioButton':
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          RadioComponent
        );
        break;
      case 'select':
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          SelectComponent
        );
        break;
      case 'inputFile':
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          FileComponent
        );
        break;
      default:
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          InputComponent
        );
        break;
    }

    this.formElements.push(componentFactory);

    const viewContainerRef = this.host.viewContainerRef;
    viewContainerRef.clear();

    this.formElements.forEach(arrComponentFactory => {
      viewContainerRef.createComponent(arrComponentFactory);
    });
  }
}
