import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Service } from 'typedi';
import { Like } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { AllCities } from '../models/AllCities';
import { CityRepository } from '../repositories/CityReposoitory';

@Service()
export class CityService {
    constructor(@OrmRepository() private cityRepository: CityRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }
    // create
    public async createCity(city: any): Promise<AllCities> {
        this.log.info('City created Successfully');
        return await this.cityRepository.save(city);
    }
    // findone
    public async findOne(city: any): Promise<any> {
        return await this.cityRepository.findOne(city);
    }
    // update
    public async update(id: number, city: AllCities): Promise<any> {
        city.cityId = id;
        return await this.cityRepository.save(city);
    }
    // Delete
    public async delete(id: number): Promise<any> {
        return await this.cityRepository.delete(id);
    }
    // List
    public async list(limit: any, offset: any, select: any = [], search: any = [], whereConditions: any = [], count: number | boolean): Promise<any> {
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
        condition.order = {
            cityName: 'ASC',
        };
        if (count) {
            return await this.cityRepository.count(condition);
        } else {
            return await this.cityRepository.find(condition);
        }
    }
    public async find(): Promise<any> {
        return await this.cityRepository.find();
    }
}
