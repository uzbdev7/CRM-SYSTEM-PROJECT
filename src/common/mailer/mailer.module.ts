import { MailerModule as NestMailerModule } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from "path";
import { MailerService } from "./mailer.service";

@Global()
@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        service: "gmail",
        auth: {
          user: "mengilovahrorbek5@gmail.com",
          pass: "lqxm pigx pldz kyqq", 
        }
      },
      defaults: {
        from: '<<Axrorbek>> <mengilovahrorbek5@gmail.com>'
      },
      template: {
        dir: join(process.cwd(), "src", "templates"),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    })
  ],
  providers: [MailerService],
  exports: [MailerService]
})
export class MailerModule {}
