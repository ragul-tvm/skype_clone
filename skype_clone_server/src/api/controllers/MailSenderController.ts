import 'reflect-metadata';
import { Body, JsonController, Post, Res } from 'routing-controllers';
import { CreateEmailRequest } from './requests/CreateEmailRequest';
import nodemailer from 'nodemailer';
import { EmailTemplateService } from '../services/EmailTemplateService';
import { OTPGenerateService } from '../../auth/otp.service';

@JsonController('/send-email')
export class MailSenderController {
    constructor(
        private mailTemplateService: EmailTemplateService
    ) { }

    @Post('/create')
    // @Authorized()
    public async createEmail(@Body({ validate: true }) createParam: CreateEmailRequest, @Res() response: any): Promise<any> {
        const isExists: any = await this.mailTemplateService.findOne({
            where: {
                emailTemplateId: createParam.emailTemplateId,
                isActive: 1,
            },
        });

        if (isExists) {
            const OTP: any = await OTPGenerateService.generateOTP(2);
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: createParam.userName,
                    pass: createParam.password,
                },
                logger: true,
            });
            const msgEdit = `OTP to reset your password is: ${OTP.OTP}`;
            const info = await transporter.sendMail({
                from: '"Mail From"' + createParam.from,
                to: createParam.to,
                subject: isExists.subject,
                html: msgEdit,
                headers: { 'x-cloudmta-class': 'standard' },
            });
            if (info.response !== undefined) {
                const successResponse: any = {
                    status: 1,
                    message: 'Email sent successfully.',
                    data: info.response,
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'unable to send email',
                };
                return response.status(400).send(errorResponse);
            }
        } else {
            return;
        }
    }
}
