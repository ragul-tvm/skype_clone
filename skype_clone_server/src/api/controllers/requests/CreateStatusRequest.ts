import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class CreateStatusRequest {
    @IsNotEmpty()
    public status: string;

    public emojiId: number;

    public personId: number;
}
