import { IsNotEmpty } from 'class-validator';
import 'reflect-metadata';

export class CreateEmailRequest {
    @IsNotEmpty()
    public userName: string;

    public password: string;

    public from: string;

    public to: string;

    public emailTemplateId: number;
}
