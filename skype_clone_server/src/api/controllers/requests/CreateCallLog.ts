import { IsNotEmpty } from 'class-validator';

export class CreateCallLog {
    @IsNotEmpty()
    public callTo: number;

    public callDuration: number;

    public costPerSec: number;

    @IsNotEmpty()
    public isPaidCall: number;

    public audioOrVideo: number;

}
