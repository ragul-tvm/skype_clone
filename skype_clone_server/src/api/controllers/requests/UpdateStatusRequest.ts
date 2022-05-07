import { IsNotEmpty } from 'class-validator';

export class UpdateStatusRequest {
    @IsNotEmpty()
    public statusId: number;

    @IsNotEmpty()
    public status: string;

    public emojiId: number;
}
