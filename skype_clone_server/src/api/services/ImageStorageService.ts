// import { Logger, LoggerInterface } from '../../decorators/Logger';
// import { Service } from 'typedi';
// import { OrmRepository } from 'typeorm-typedi-extensions';
// import { ImageStorageRepository } from '../repositories/ImageStorageRepository';
// import { ImageStorage } from '../models/ImageStorage';

// @Service()
// export class ImageStorageService {
//     constructor(@OrmRepository() private imageStorageRepository: ImageStorageRepository,
//                 @Logger(__filename) private log: LoggerInterface) {
//     }

//     public async create(image: any): Promise<ImageStorage> {
//         this.log.info('Image Stored Successfully');
//         return await this.imageStorageRepository.save(image);
//     }

//     public async update(id: number, image: ImageStorage): Promise<any> {
//         image.imageId = id;
//         return await this.imageStorageRepository.save(image);
//     }

//     public async delete(id: number): Promise<any> {
//         return await this.imageStorageRepository.delete(id);
//     }

//     public async findOne(id: number): Promise<any> {
//         return await this.imageStorageRepository.findOne(id);
//     }

//     public async find(): Promise<any> {
//         return await this.imageStorageRepository.find();
//     }

//     public async list(limit: number, offset: number, select: any = [], count: number | boolean): Promise<any> {
//         const condition: any = {};

//         if (limit && limit > 0) {
//             condition.take = limit;
//             condition.skip = offset;
//         }
//         if (select && select.length > 0) {
//             condition.select = select;
//         }
//         if (count) {
//             return await this.imageStorageRepository.count(condition);
//         } else {
//             return await this.imageStorageRepository.find(condition);
//         }
//     }
// }
