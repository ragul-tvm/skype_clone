import { IsNotEmpty } from 'class-validator';

export class PersonLoginParamRequest {
    @IsNotEmpty()
    public userName: string;

    @IsNotEmpty()
    public password: string;
}
