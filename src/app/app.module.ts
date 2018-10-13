import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { InputComponent } from './form/input/input.component';
import { TextareaComponent } from './form/textarea/textarea.component';
import { CheckboxComponent } from './form/checkbox/checkbox.component';
import { RadioComponent } from './form/radio/radio.component';
import { SelectComponent } from './form/select/select.component';
import { FileComponent } from './form/file/file.component';
import { HostDirective } from './shared/directives/host.directive';
import { DoubleClickDirective } from './shared/directives/double-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    FileComponent,
    HostDirective,
    DoubleClickDirective
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    FormComponent,
    InputComponent,
    CheckboxComponent,
    FileComponent,
    RadioComponent,
    SelectComponent,
    TextareaComponent
  ]
})
export class AppModule {}
