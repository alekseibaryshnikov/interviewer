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

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    InputComponent,
    TextareaComponent,
    CheckboxComponent,
    RadioComponent,
    SelectComponent,
    FileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
