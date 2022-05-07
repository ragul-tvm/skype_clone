import { EntityRepository, Repository } from 'typeorm';
import { AllCities } from '../models/AllCities';

@EntityRepository(AllCities)
export class CityRepository extends Repository<AllCities> {

}
