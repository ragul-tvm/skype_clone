import { IsNotEmpty } from 'class-validator';
import 'reflect-metadata';

export class DeleteCityRequest {

    @IsNotEmpty()
    public cityId: number;
}
