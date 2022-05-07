
import { EntityRepository, Repository } from 'typeorm';
import { Country } from '../models/Country';

@EntityRepository(Country)
export class CountryRepository extends Repository<Country>  {

}
