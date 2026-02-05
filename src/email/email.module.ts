import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
