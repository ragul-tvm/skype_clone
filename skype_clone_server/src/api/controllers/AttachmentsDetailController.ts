import 'reflect-metadata';
import { JsonController, Post, Res, UploadedFiles } from 'routing-controllers';
import { ReturnResponseInterface } from '../../lib/logger/ReturnResponseInterface';
import { AttachmentsDetail } from '../models/AttachmentsDetail';
import { AttachmentsService } from '../services/AttachmentsDetailService';
import { ImageService } from '../services/ImageService';

@JsonController('/attachments')
export class Attachments {

    constructor(
        private attachmentService: AttachmentsService,
        private imageServices: ImageService) { }

    // create

    @Post('/upload')
    public async uploadFiles(@UploadedFiles('files') files: any, @Res() response: any): Promise<any> {
        if (files) {
            const uploaded = [];
            for (const document of files) {
                const file: any = new Promise(async (resolve, reject) => {
                    const attachment = new AttachmentsDetail();
                    const fileName = document.originalname;
                    const fileData = document.buffer;
                    const filetype: string = fileName.split('.')[1];
                    const folder = 'project/' + document.fieldname + '/';
                    const storedName = filetype.slice(0, 3).toUpperCase() + '_' + Date.now() + '.' + filetype;
                    const isFolder: any = await this.imageServices.getFolder('project/' + document.fieldname);
                    if (isFolder.CommonPrefixes && isFolder.CommonPrefixes.length < 1) {
                        await this.imageServices.createFolder('project/' + document.fieldname);
                    }
                    await this.imageServices.imageUpload((folder + storedName), fileData);
                    attachment.documentName = storedName;
                    attachment.folderPath = folder;
                    attachment.mimeType = document.mimetype;
                    const dbResult = await this.attachmentService.create(attachment);
                    resolve(dbResult);
                });
                uploaded.push(await file);
            }
            const returnResponse: ReturnResponseInterface = {
                status: 1,
                message: 'Document(s) uploaded Sucessfully',
                data: uploaded,

            };
            return response.status(200).send(returnResponse);
        }
    }
}
