import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HostDirective } from './shared/directives/host.directive';
import { DoubleClickDirective } from './shared/directives/double-click.directive';
import { EditPanelComponent } from './form/edit-panel/edit-panel.component';
import { FormElementComponent } from './form/form-element/form-element.component';
import { RadioElementComponent } from './form/form-element/radio-input/radio-element/radio-element.component';
import { RadioInputComponent } from './form/form-element/radio-input/radio-input.component';
import { SelectComponent } from './form/form-element/select/select.component';
import { SelectElementComponent } from './form/form-element/select/select-element/select-element.component';
import { ValueControllerDirective } from './shared/directives/value-controller.directive';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HostDirective,
    DoubleClickDirective,
    EditPanelComponent,
    FormElementComponent,
    RadioInputComponent,
    RadioElementComponent,
    SelectComponent,
    SelectElementComponent,
    ValueControllerDirective
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    FormComponent,
    FormElementComponent,
    RadioInputComponent,
    RadioElementComponent,
    SelectComponent,
    SelectElementComponent
  ]
})
export class AppModule { }
