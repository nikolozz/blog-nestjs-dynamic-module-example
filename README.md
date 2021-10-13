1. Register in Root (App) module.
```typescript
@Module({
  imports: [
    AwsModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        region: configService.get('AWS_REGION'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

2. Define which AWS Services should be used in the Provider
```typescript
@Module({
  imports: [AwsModule.forFeature(S3)],
  providers: [FilesService],
})
export class FilesModule {}
```

3. Inject to Provider
```typescript
@Injectable()
export class FilesService {
  constructor(
    @InjectAwsService(S3) private s3Service: S3
  ) {}
}
```
