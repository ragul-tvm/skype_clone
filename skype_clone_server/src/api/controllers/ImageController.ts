/* import { Body, Get, JsonController, Post, Req, Res } from 'routing-controllers';
// import { ImageStorage } from '../models/ImageStorage';
import { ImageService } from '../services/ImageService';
import { ImageStorageService } from '../services/ImageStorageService';
import { ImageSaveRequest } from './requests/ImageSaveRequest';
import fs = require('fs');

@JsonController('/image')
export class ImageStorageController {
    constructor(
        private imageStorageService: ImageStorageService,
        private imageService: ImageService) {}

    @Post('/save-image')
    public async save(@Body({validate: true}) imageParam: ImageSaveRequest, @Res() response: any): Promise<any> {
        const avatar = imageParam.imageBase64;

        const type = avatar.split(';')[0].split('/')[1];
        const name = 'Img_' + Date.now() + '.' + type;
        const path = imageParam.folderName + '/';
        const base64Date = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const isFolder: any = await this.imageService.getFolder(imageParam.folderName);
        if (isFolder.CommonPrefixes && isFolder.CommonPrefixes.length < 1) {
            await this.imageService.createFolder(imageParam.folderName);
        }
        const isUploaded: any = await this.imageService.imageUpload((path + name), base64Date);
        const image = new ImageStorage();
        image.imageName = name;
        image.BaseFolder = 'uploads';
        image.subFolder = path;
        image.fileType = type;
        image.absolutePath = image.BaseFolder + '/' + path + name;
        const imageDBsave: any = await this.imageStorageService.create(image);
        if (isUploaded && imageDBsave) {
            const successResponse: any = {
                status: 1,
                message: 'Image Upload Done',
                data: {Name: imageDBsave.imageName, Path: imageDBsave.absolutePath},
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable Upload',
            };
            return response.status(400).send(errorResponse);
        }
    }
    @Get('/download')
    public async download(@Req() request: any, @Res() response: any): Promise<any> {
        const imageDBsave: any = await this.imageStorageService.findOne(4);
        const fileList: any = [];
        // for await (const item of imageDBsave) {
        //     fileList.push(await this.imageService.readDir(item.absolutePath.split('Img')[0]));
        // }

        if (fileList) {
            // const successResponse: any = {
            //     status: 1,
            //     message: 'Image Upload Done',
            //     data: {Name: imageDBsave.imageName, Path: imageDBsave.absolutePath},
            // };
            // return response.status(200).download();
            return new Promise((resolve, reject) => {
                response.download(process.cwd() + '/' + imageDBsave.absolutePath, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        fs.unlinkSync(process.cwd() + '/' + imageDBsave.absolutePath);
                        return response.end();
                    }
                });
            });
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable Upload',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
 */
