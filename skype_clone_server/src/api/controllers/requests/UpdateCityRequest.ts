import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class UpdateCityRequest {
    @IsNotEmpty()
    public cityId: number;

    public cityName: string;

    public countryId: number;

    public isActive: number;
}
