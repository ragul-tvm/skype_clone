import { Service } from 'typedi';
import { Like } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { CashBalance } from '../models/CashBalance';
import { CashBalanceRepository } from '../repositories/CashBalanceRepository';

@Service()
export class CashBalanceService {
    constructor(@OrmRepository() private cashBalanceRepository: CashBalanceRepository) {}

    // create Calls
    public async create(cashBalance: any): Promise<CashBalance> {
        return this.cashBalanceRepository.save(cashBalance);
    }

    // findCondition
    public findOne(cashBalance: any): Promise<any> {
        return this.cashBalanceRepository.findOne(cashBalance);
    }

    // update cashBalance
    public update(id: any, cashBalance: CashBalance): Promise<any> {
        cashBalance.cashBalanceId = id;
        return this.cashBalanceRepository.save(cashBalance);
    }

    // cashBalance List
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

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.cashBalanceRepository.count(condition);
        } else {
            return this.cashBalanceRepository.find(condition);
        }
    }

    // delete Calls
    public async delete(id: number): Promise<any> {
        return await this.cashBalanceRepository.delete(id);
    }

}
