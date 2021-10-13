import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { AWS_MODULE_TOKEN } from './constants';
import {
  AwsConfigurationOptions,
  AwsModuleOptions,
} from './interfaces/options.interface';

@Global()
@Module({})
export class AwsModule {
  static forRootAsync(options: AwsModuleOptions): DynamicModule {
    const providers = [this.createProvider(options)];
    return {
      module: AwsModule,
      imports: options.imports,
      providers,
      exports: [AWS_MODULE_TOKEN],
    };
  }

  static forFeature(...services: unknown[]): DynamicModule {
    const providers = services.map(this.createServiceProvider);

    return {
      module: AwsModule,
      providers,
      exports: providers,
    };
  }

  private static createProvider(options: AwsModuleOptions): Provider {
    return {
      provide: AWS_MODULE_TOKEN,
      useFactory: options.useFactory,
      inject: options.inject,
    };
  }

  private static createServiceProvider(service: any): Provider {
    return {
      provide: service.serviceIdentifier,
      useFactory: (options: AwsConfigurationOptions) => new service(options),
      inject: [AWS_MODULE_TOKEN],
    };
  }
}
