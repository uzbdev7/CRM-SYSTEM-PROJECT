import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BranchesModule } from './modules/branches/branches.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [UsersModule, BranchesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
