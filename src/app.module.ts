import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, AppModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
