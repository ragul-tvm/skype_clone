import { Authorized, Body, JsonController, Post, Req, Res } from 'routing-controllers';
import { ReturnResponseInterface } from 'src/lib/logger/ReturnResponseInterface';
import { Calls } from '../models/Calls';
import { CashBalanceService } from '../services/CashBalanceService';
import { PersonService } from '../services/PersonService';
import { CreateCallLog } from './requests/CreateCallLog';

@JsonController('/users/call')
export class MakeCalls {

    constructor(
        private personService: PersonService,
        private cashBalance: CashBalanceService) { }

    @Post('/make')
    @Authorized()
    public async makeCall(@Body({ validate: true }) createCallLog: CreateCallLog, @Req() request: any, @Res() response: any): Promise<any> {

        const person = await this.personService.findOne({
            where: {
                personId: request.user.personId,
                deleteFlag: 0,
            },
        });
        if (person) {
            const account = await this.cashBalance.list(0, 0, [], [], [{ name: 'personId', value: person.personId }], 0);
            const lastLedger = account[account.length - 1];
            if (lastLedger.closingBalance > 0) {
                const callLog = new Calls();
                callLog.personId = person.personId;
                callLog.callTo = createCallLog.callTo;
                callLog.callDuration = createCallLog.callDuration;
                callLog.costPerSec = (createCallLog.isPaidCall === 1) ? createCallLog.costPerSec : 0;
                callLog.totalCallCost = (createCallLog.isPaidCall === 1 && createCallLog.audioOrVideo === 0) ?
                    createCallLog.costPerSec * createCallLog.callDuration : 0;

            } else {
                const returnResponse: ReturnResponseInterface = {
                    status: 0,
                    message: 'Unable to make call due to insufficient balance',
                };

                return response.status(400).send(returnResponse);
            }
        } else {
            const returnResponse: ReturnResponseInterface = {
                status: 0,
                message: 'Unable to make call due to unauthorized access',
            };

            return response.status(400).send(returnResponse);
        }
    }
}
