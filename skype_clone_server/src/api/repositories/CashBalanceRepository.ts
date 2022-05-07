import { EntityRepository, Repository } from 'typeorm';
import { CashBalance } from '../models/CashBalance';

@EntityRepository(CashBalance)
export class CashBalanceRepository extends Repository<CashBalance> {}
