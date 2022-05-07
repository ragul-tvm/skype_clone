import { Service } from 'typedi';
import { Like } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { AttachmentsDetail } from '../models/AttachmentsDetail';
import { AttachmentsDetailRepository } from '../repositories/AttachmentsDetailRepository';

@Service()
export class AttachmentsService {
    constructor(@OrmRepository() private attachmentsRepository: AttachmentsDetailRepository) { }

    public async create(attachments: AttachmentsDetail): Promise<AttachmentsDetail> {
        return await this.attachmentsRepository.save(attachments);
    }

    public async update(id: number, attachments: AttachmentsDetail): Promise<AttachmentsDetail> {
        attachments.attachmentId = id;
        return await this.attachmentsRepository.save(attachments);
    }

    public async find(condition: any): Promise<any> {
        return await this.attachmentsRepository.find(condition);
    }

    public async findOne(condition: any): Promise<AttachmentsDetail> {
        return await this.attachmentsRepository.findOne(condition);
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
            return this.attachmentsRepository.count(condition);
        } else {
            return this.attachmentsRepository.find(condition);
        }

    }

    public async delete(id: number): Promise<any> {
        await this.attachmentsRepository.delete(id);
    }
}
