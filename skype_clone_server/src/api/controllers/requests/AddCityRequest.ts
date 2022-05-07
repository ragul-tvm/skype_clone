import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class AddCityRequest {

    @IsNotEmpty()
    public cityName: string;

    public countryId: number;

    public isActive: number;
}
