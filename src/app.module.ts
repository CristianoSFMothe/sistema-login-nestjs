import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AppModule } from './user/app/app.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [PrismaModule, AppModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
