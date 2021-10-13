import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { ConfigurationOptions } from 'aws-sdk';

export type AwsModuleOptions = Pick<ModuleMetadata, 'imports'> &
  Omit<FactoryProvider<ConfigurationOptions>, 'provide'>;

export type AwsConfigurationOptions = ConfigurationOptions;
