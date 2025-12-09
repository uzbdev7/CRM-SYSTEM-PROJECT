import { Injectable } from "@nestjs/common";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailerService{
    constructor(private mailerService: NestMailerService) {}

    async sendOtpEmail(to: string, fullName: string, otpCode: string){
        return this.mailerService.sendMail({
            to,
            subject: "Your OTP Code",
            template: "verify-otp", 
            context:{
                fullName,
                otpCode
            }
        });
    }
}
