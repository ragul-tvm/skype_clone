import { EntityRepository, Repository } from 'typeorm';
import { Calls } from '../models/Calls';

@EntityRepository(Calls)
export class CallsRepository extends Repository<Calls> {}
