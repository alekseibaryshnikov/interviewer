import { FormElementModel } from "./form-element.model";

export interface DynamicComponent {
  data: FormElementModel;
  type: string;
}
