import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { HostDirective } from './shared/directives/host.directive';
import { FormComponent } from './form/form.component';
import { DatabaseService } from './shared/services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(HostDirective)
  host: HostDirective;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver, private _database: DatabaseService) {}

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

  onClearCache() {
    this._database.onClearCache();
  }
}
