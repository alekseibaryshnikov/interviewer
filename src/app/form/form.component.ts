import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild
} from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { FormElementModel } from '../shared/models/form-element.model';
import { Observable } from 'rxjs';
import { HostDirective } from '../shared/directives/host.directive';
import { DynamicComponent } from '../shared/models/dynamic-component';
import { FormElementComponent } from './form-element/form-element.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formElements$: Observable<FormElementModel[]>;

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
        let componentFactory = this._componentFactoryResolver.resolveComponentFactory(FormElementComponent);
        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<DynamicComponent>componentRef.instance).data = formElement;
        (<DynamicComponent>componentRef.instance).type = formElement.type;
      });
    });
  }

  onAddFormElement(elementType: string) {
    const newComponent = this._makeDefaultComponentData(elementType);
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
