import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './auth/token/token.module';
import { SharedAuthModule } from './auth/shared-auth/shared-auth.module';
import { DatabaseModule } from './database.module';
import { DatabaseMiddleware } from './database.middleware';


@Module({
  imports: [
    DatabaseModule,
    ItemsModule,
    AuthModule,
    TokenModule,
    SharedAuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DatabaseMiddleware).forRoutes('api');
  }
}
