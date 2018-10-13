import { Type } from "@angular/core";
import { FormElementModel } from "./form-element.model";

export class DynamicComponentItem {
  constructor (public component: Type<any>, public data: FormElementModel) {}
}
