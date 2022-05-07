import { EntityRepository, Repository } from 'typeorm';
import { Status } from '../models/Status';

@EntityRepository(Status)
export class StatusRepository extends Repository<Status> {

}
