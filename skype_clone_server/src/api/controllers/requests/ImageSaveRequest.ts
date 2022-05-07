import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class ImageSaveRequest {
    @IsNotEmpty()
    public imageBase64: string;

    public folderName: string;
}
