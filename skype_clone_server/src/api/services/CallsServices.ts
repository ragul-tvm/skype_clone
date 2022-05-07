import { Service } from 'typedi';
import { Like } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Calls } from '../models/Calls';
import { CallsRepository } from '../repositories/CallsRepository';

@Service()
export class CallService {
    constructor(@OrmRepository() private callRepository: CallsRepository) {}

    // create Calls
    public async create(call: any): Promise<Calls> {
        return this.callRepository.save(call);
    }

    // findCondition
    public findOne(call: any): Promise<any> {
        return this.callRepository.findOne(call);
    }

    // update call
    public update(id: any, call: Calls): Promise<any> {
        call.callId = id;
        return this.callRepository.save(call);
    }

    // call List
    public list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        condition.order = {
            name: 'ASC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.callRepository.count(condition);
        } else {
            return this.callRepository.find(condition);
        }
    }

    // delete Calls
    public async delete(id: number): Promise<any> {
        return await this.callRepository.delete(id);
    }

}
