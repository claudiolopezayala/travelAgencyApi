import nodemailer from 'nodemailer';
import { envs } from './dotenv';

interface MailOptions{
    to: string;
    subject: string;
    htmlBody: string;
}

export class EmailService{
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth:{
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_ACCESS_TOKEN
        }
    })

    async sendEmail(options: MailOptions){
      const { to, subject, htmlBody } = options;
      await this.transporter.sendMail({
          to,
          subject,
          html:htmlBody
      });
    }
}