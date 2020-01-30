import { FormInputField } from "../form-input-field/form-input-field";
import { IFormInputConfig } from "./form-input-config.interface";

export interface IFormConfig {
  fields: Array<FormInputField | IFormInputConfig>;
}
