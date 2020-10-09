import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import keys from '../config/keys';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CourierModule } from './courier/courier.module';
import { DeliveryModule } from './delivery/delivery.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot(keys.mongodb), DeliveryModule, CourierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
