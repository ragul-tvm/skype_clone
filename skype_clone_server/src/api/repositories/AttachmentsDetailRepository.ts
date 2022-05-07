import { EntityRepository, Repository } from 'typeorm';
import { AttachmentsDetail } from '../models/AttachmentsDetail';

@EntityRepository(AttachmentsDetail)
export class AttachmentsDetailRepository extends Repository<AttachmentsDetail> {}
