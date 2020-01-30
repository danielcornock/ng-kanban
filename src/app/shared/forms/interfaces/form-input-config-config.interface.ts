import { IControlExport } from "./control-export.interface";

export interface IFormInputConfigConfig {
  required?: boolean;
  getValue?: () => any;
  setValue?: (value: IControlExport) => void;
}
