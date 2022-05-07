import 'reflect-metadata';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Service } from 'typedi';
import { Status } from '../models/Status';
import { StatusRepository } from '../repositories/StatusRepository';
import { Like } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

@Service()
export class StatusService {
    constructor(@OrmRepository() private statusRepository: StatusRepository, @Logger(__filename) private log: LoggerInterface) {}

    public async create(status: Status): Promise<Status> {
        this.log.info('Status Created Successfully');
        return await this.statusRepository.save(status);
    }

    public async update(id: number, status: Status): Promise<any> {
        status.statusId = id;
        return await this.statusRepository.save(status);
    }

    public async find(condition: any): Promise<any> {
        return await this.statusRepository.find(condition);
    }

    public async findOne(condition: any): Promise<Status> {
        return await this.statusRepository.findOne(condition);
    }

    public async list(limit: number = 0, offset: number = 0, select: any = [], relation: any = [], whereConditions: any = [], search: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
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
            statusId: 'ASC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.statusRepository.count(condition);
        } else {
            return this.statusRepository.find(condition);
        }

    }

    public async delete(id: number): Promise<any> {
        await this.statusRepository.delete(id);
    }
}
