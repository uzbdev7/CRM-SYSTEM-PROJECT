import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailerModule } from 'src/common/mailer/mailer.module';

@Module({
  imports: [MailerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}