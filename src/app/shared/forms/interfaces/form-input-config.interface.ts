import { IFormInputConfigConfig } from './form-input-config-config.interface';

export interface IFormInputConfig {
  name: string;
  type?: string;
  config: IFormInputConfigConfig;
}
