import { IControlExport } from "./control-export.interface";

export interface IFormInputConfig {
  required?: boolean;
  getValue?: () => any;
  setValue?: (value: IControlExport) => void;
}
