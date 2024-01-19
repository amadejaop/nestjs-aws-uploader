import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ([{
        ttl: configService.getOrThrow('UPLOAD_RATE_TTL'),
        limit: configService.getOrThrow('UPLOAD_RATE_LIMIT'),
      }]),
      inject: [ConfigService],
    }),
    /* ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 3,
    }]) */
  ],
  controllers: [UploadController],
  providers: [UploadService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }],
})
export class UploadModule {}
