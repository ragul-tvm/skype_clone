import { IsNotEmpty } from 'class-validator';
import 'reflect-metadata';

export class CreatePersonRequest {

    @IsNotEmpty()
    public firstName: string;

    public lastName: string;

    @IsNotEmpty()
    public emailId: string;

    public location: string;

    public birthday: string;

}
