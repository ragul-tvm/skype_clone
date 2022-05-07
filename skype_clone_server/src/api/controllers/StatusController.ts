import 'reflect-metadata';
import { Body, Delete, Get, JsonController, Param, Post, Put, QueryParam, Res } from 'routing-controllers';
import { Status } from '../models/Status';
import { PersonService } from '../services/PersonService';
import { StatusService } from '../services/StatusService';
import { CreateStatusRequest } from './requests/CreateStatusRequest';
import { UpdateStatusRequest } from './requests/UpdateStatusRequest';

@JsonController('/status')
export class StatusController {
    constructor(private statusService: StatusService, private personService: PersonService) {}

    @Post('/add-status')
    public async addStatus(@Body({validate: true}) createStatusRequest: CreateStatusRequest, @Res() response: any): Promise<any> {
        const status = new Status();

        status.status = createStatusRequest.status;
        status.emojiId = createStatusRequest.emojiId;
        const isSaved = await this.statusService.create(status);

        if (isSaved) {
            if (createStatusRequest.personId) {
                const person = await this.personService.findOne({
                    where: {
                        personId: createStatusRequest.personId,
                        deleteFlag: 0,
                    },
                });
                if (person) {
                    person.statusId = isSaved.statusId;
                    await this.personService.update(person.personId, person);
                }
            }
            const returnResponse = {
                status: 1,
                message: 'Status saved Successfully',
                data: isSaved,
            };
            return response.status(200).send(returnResponse);
        } else {
            const returnResponse = {
                status: 0,
                message: 'Status save Unsuccessful',
            };
            return response.status(400).send(returnResponse);
        }
    }

    @Put('/update-status')
    public async update(@Body({validate: true}) updateStatusRequest: UpdateStatusRequest, @Res() response: any): Promise<any> {
        const status = new Status();

        status.statusId = updateStatusRequest.statusId;
        status.status = updateStatusRequest.status;
        status.emojiId = updateStatusRequest.emojiId;

        const isUpdated = await this.statusService.update(status.statusId, status);
        if (isUpdated) {
            const returnResponse = {
                status: 1,
                message: 'Status updated Successfully',
                data: isUpdated,
            };
            return response.status(200).send(returnResponse);
        } else {
            const returnResponse = {
                status: 0,
                message: 'Status update Unsuccessful',
            };
            return response.status(400).send(returnResponse);
        }
    }
    @Delete('/delete-status/:id')
    public async delete(@Param('id') id: number, @Res() response: any): Promise<any> {

        const isUpdated = await this.statusService.delete(id);
        if (isUpdated === undefined) {
            const returnResponse = {
                status: 1,
                message: 'Status updated Successfully',
            };
            return response.status(200).send(returnResponse);
        } else {
            const returnResponse = {
                status: 0,
                message: 'Status update Unsuccessful',
            };
            return response.status(400).send(returnResponse);
        }
    }

    @Get('/suggested-status')
    public async listPredefiend(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = [];
        const whereConditions = [];
        const search = [
            {
                name: 'status',
                op: 'like',
                value: keyword ? keyword : '',
            },
        ];

        const result = await this.statusService.list(10, 0, select, [], whereConditions, search, count);

        if (count) {
            const returnResponse = {
                status: 1,
                message: 'All status count get Successfull',
                data: result,
            };
            return response.status(200).send(returnResponse);
        } else {
            const returnResponse = {
                status: 1,
                message: 'All status get Successfull',
                data: result,
            };
            return response.status(200).send(returnResponse);
        }
    }

}
