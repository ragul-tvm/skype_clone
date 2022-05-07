import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { PersonRepository } from '../repositories/PersonRepository';
import { Person } from '../models/Person';
import { Brackets, getConnection, Like } from 'typeorm';
// import { Logger } from 'src/lib/logger';

@Service()

export class PersonService {

    constructor(@OrmRepository() private personRepository: PersonRepository, @Logger(__filename) private log: LoggerInterface) {}

    public async create(person: Person): Promise<any> {
        this.log.info('Person Record Created Successfully');
        return await this.personRepository.save(person);
    }

    public async update(id: number, person: Person): Promise<Person> {
        person.personId = id;
        return await this.personRepository.save(person);
    }

    public async find(condition: any): Promise<any> {
        return await this.personRepository.find(condition);
    }

    public async findOne(condition: any): Promise<Person> {
        return await this.personRepository.findOne(condition);
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
            return this.personRepository.count(condition);
        } else {
            return this.personRepository.find(condition);
        }

    }

    public async delete(id: number): Promise<any> {
        await this.personRepository.delete(id);
    }

    // List By Query Builder
    public async listByQueryBuilder(
        limit: number,
        offset: number,
        select: any = [],
        whereConditions: any = [],
        searchConditions: any = [],
        relations: any = [],
        groupBy: any = [],
        sort: any = [],
        count: boolean | number = false,
        rawQuery: boolean = false)
        : Promise<Person[] | number> {
        const query: any = await getConnection().getRepository(Person).createQueryBuilder();
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }
        // Join
        if (relations && relations.length > 0) {
            relations.forEach((joinTb: any) => {
                if (joinTb.isSelect) {
                    query.innerJoinAndSelect(joinTb.tableName, joinTb.aliasName);
                } else {
                    query.innerJoin(joinTb.tableName, joinTb.aliasName);
                }
            });
        }
        // Where
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                if (item.op === 'where' && item.sign === undefined) {
                    query.where(item.name + ' = ' + item.value);
                } else if (item.op === 'and' && item.sign === undefined) {
                    query.andWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'and' && item.sign !== undefined) {
                    query.andWhere(' \'' + item.name + '\'' + ' ' + item.sign + ' \'' + item.value + '\'');
                } else if (item.op === 'raw' && item.sign !== undefined) {
                    query.andWhere(item.name + ' ' + item.sign + ' \'' + item.value + '\'');
                } else if (item.op === 'or' && item.sign === undefined) {
                    query.orWhere(item.name + ' = ' + item.value);
                } else if (item.op === 'IN' && item.sign === undefined) {
                    query.andWhere(item.name + ' IN (' + item.value + ')');
                } else if (item.op === 'not' && item.sign === undefined) {
                    query.andWhere(item.name + ' != ' + item.value);
                } else if (item.op === 'cancel' && item.sign === undefined) {
                    query.andWhere(item.name + ' != ' + item.value);
                } else if (item.op === 'andWhere' && item.sign === undefined) {
                    query.andWhere(item.name + ' = ' + ' \'' + item.value + '\'');
                } else if (item.op === 'Like' && item.sign === undefined) {
                    query.andWhere('LOWER(' + item.name + ')' + ' LIKE ' + '\'%' + item.value + '%\'');
                } else if (item.op === 'Between') {
                    query.andWhere(item.name + ' >= ' + "'" + item.value1 + "'" + ' AND ' + item.name + ' <= ' + "'" + item.value2 + "'");
                } else if (item.op === 'fromdate') {
                    query.andWhere(item.name + ' >= ' + ' \'' + item.value + '\'');
                } else if (item.op === 'toDate') {
                    query.orWhere(item.name + ' <= ' + ' \'' + item.value + '\'');
                } else if (item.op === 'orLike' && item.sign === undefined) {
                    query.orWhere('LOWER(' + item.name + ')' + ' LIKE ' + '\'%' + item.value + '%\'');
                } else if (item.op === 'name' && item.sign === undefined) {
                    query.andWhere(item.name + ' = ' + ' \'' + item.value + '\'');
                } else if (item.op === 'curdate') {
                    query.andWhere('Date' + '(' + item.name + ')' + ' = ' + 'CURDATE()');
                } else if (item.op === 'notNull') {
                    query.andWhere('NOT ISNULL(' + item.name + ')');
                }
            });
        }
        // Keyword Search
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                if ((table.name && table.name instanceof Array && table.name.length > 0) && (table.value && table.value instanceof Array && table.value.length > 0)) {
                    const namesArray = table.name;
                    namesArray.forEach((name: string, index: number) => {
                        query.andWhere(new Brackets(qb => {
                            const valuesArray = table.value;
                            valuesArray.forEach((value: string | number, subIndex: number) => {
                                if (subIndex === 0) {
                                    qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + (table.op === 'where' ? '\'' + value + '\'' : '\'%' + value + '%\''));
                                    return;
                                }
                                qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + (table.op === 'where' ? '\'' + value + '\'' : '\'%' + value + '%\''));
                            });
                        }));
                    });
                } else if (table.name && table.name instanceof Array && table.name.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const namesArray = table.name;
                        namesArray.forEach((name: string, index: number) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + name + ')' + ' LIKE ' + (table.op === 'where' ? '\'' + table.value + '\'' : '\'%' + table.value + '%\''));
                                return;
                            }
                            qb.orWhere('LOWER(' + name + ')' + ' LIKE ' + (table.op === 'where' ? '\'' + table.value + '\'' : '\'%' + table.value + '%\''));
                        });
                    }));
                } else if (table.value && table.value instanceof Array && table.value.length > 0) {
                    query.andWhere(new Brackets(qb => {
                        const valuesArray = table.value;
                        valuesArray.forEach((value: string | number, index: number) => {
                            if (index === 0) {
                                qb.andWhere('LOWER(' + table.name + ')' + ' LIKE ' + (table.op === 'where' ? '\'' + value + '\'' : '\'%' + value + '%\''));
                                return;
                            }
                            qb.orWhere('LOWER(' + table.name + ')' + ' LIKE ' + (table.op === 'where' ? '\'' + value + '\'' : '\'%' + value + '%\''));
                        });
                    }));
                }
            });
        }
        // GroupBy
        if (groupBy && groupBy.length > 0) {
            let i = 0;
            groupBy.forEach((item: any) => {
                if (i === 0) {
                    query.groupBy(item.name);
                } else {
                    query.addGroupBy(item.name);
                }
                i++;
            });
        }
        // orderBy
        if (sort && sort.length > 0) {
            sort.forEach((item: any) => {
                query.orderBy('' + item.name + '', '' + item.order + '');
            });
        }
        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }
        if (!count) {
            if (rawQuery) {
                return query.getRawMany();
            }
            return query.getMany();
        } else {
            return query.getCount();
        }
    }
}
