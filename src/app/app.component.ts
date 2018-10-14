import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { HostDirective } from './shared/directives/host.directive';
import { FormComponent } from './form/form.component';
import { DatabaseService } from './shared/services/database.service';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(HostDirective)
  host: HostDirective;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver, private _database: DatabaseService, private _storageService: StorageService) { }

  onCreateForm() {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      FormComponent
    );

    const viewContainerRef = this.host.viewContainerRef;
    viewContainerRef.clear();

    viewContainerRef.createComponent(componentFactory);
  }

  onDeleteForm() {
    this._storageService.onDeleteForm();
  }

  onClearCache() {
    this._database.onClearCache();
  }
}
