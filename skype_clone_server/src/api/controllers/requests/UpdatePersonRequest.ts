import { IsNotEmpty } from 'class-validator';

export class UpdatePersonRequest {

    @IsNotEmpty()
    public personId: number;

    public firstName: string;

    public lastName: string;

    public location: string;

    public birthday: string;

    public profileImageId: number;

    public statusId: number;

    public activeStatus: number;

}
