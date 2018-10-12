import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { HostDirective } from './shared/directives/host.directive';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(HostDirective)
  host: HostDirective;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}

  onCreateForm() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      FormComponent
    );

    const viewContainerRef = this.host.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
  }

  onDeleteForm() {
    this.host.viewContainerRef.clear();
  }
}
