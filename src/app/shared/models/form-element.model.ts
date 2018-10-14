export interface FormElementModel {
  id: number;
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  parent?: number;
  variants?: FormElementModel[];
}
