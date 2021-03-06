import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  ElementRef
} from '@angular/core';
import { DynamicComponent } from 'src/app/shared/models/dynamic-component';
import { FormElementModel } from 'src/app/shared/models/form-element.model';
import { HostDirective } from 'src/app/shared/directives/host.directive';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SelectElementComponent } from './select-element/select-element.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, DynamicComponent {
  @Input()
  data: FormElementModel;
  @Input()
  type: string;

  @ViewChild(HostDirective)
  host: HostDirective;

  private _variants = new BehaviorSubject(<FormElementModel[]>[]);
  variants$ = this._variants.asObservable();

  constructor(
    private _storageService: StorageService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @ViewChild('label')
  label: ElementRef;

  ngOnInit() {
    if (!this.data.variants) {
      this.data.variants = [];
    }

    this._variants.next(this.data.variants);

    this.variants$.subscribe(variants => {
      if (variants) {
        const viewContainerRef = this.host.viewContainerRef;
        viewContainerRef.clear();

        variants.forEach(variant => {
          const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
            SelectElementComponent
          );
          const componentRef = viewContainerRef.createComponent(
            componentFactory
          );
          (<DynamicComponent>componentRef.instance).data = variant;
          (<DynamicComponent>componentRef.instance).type = 'inputSelectElement';
        });
      }
    });
  }

  editElement() {
    if (this.label.nativeElement.innerHTML.trim() !== '') {
      this.data.label = this.label.nativeElement.innerHTML;
      this._storageService.onEditElement(this.data);
    }
  }

  onAddVariant() {
    const newComponent = this._makeDefaultComponentData();

    const result = this._storageService.onAddVariant(this.data, newComponent);
    if (result !== 0) {
      alert(result);
    }
  }

  private _makeDefaultComponentData(): FormElementModel {
    const id = Date.now();
    return {
      id,
      type: 'inputRadioElement',
      label: 'Default label',
      name: `form_element_inputRadioElement_${id}`,
      parent: this.data.id,
      value: 'Default value'
    };
  }
}
