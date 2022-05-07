import { EntityRepository, Repository } from 'typeorm';
import { Person } from '../models/Person';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {}
