import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { sendPasswordConfirmation } from 'src/utils/emailTemplates/sendPasswordConfirmation';
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly config: ConfigService) {
    const smtpPort = Number(this.config.get('SMTP_PORT'));
    this.transporter = nodemailer.createTransport({
      host: config.get('SMTP_HOST'),
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      auth: {
        user: config.get('SMTP_EMAIL'),
        pass: config.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendConfirmation(token: string, email: string) {
    const serverUrl = this.config.get('SERVER_URL') as string;
    const link = `${serverUrl}/auth/confirm-email/?token=${token}`;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: email,
      subject: 'Please confirm your email address',
      html: sendPasswordConfirmation(link),
    });
  }
}
