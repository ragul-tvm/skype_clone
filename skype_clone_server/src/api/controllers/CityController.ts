import 'reflect-metadata';
import {
    Post,
    Body,
    JsonController,
    Res,
    Put,
    Authorized,
    Delete,
    Get,
    QueryParam,
} from 'routing-controllers';
import { CityService } from '../services/CityService';
import { AddCityRequest } from './requests/AddCityRequest';
import { AllCities } from '../models/AllCities';
import { CountryService } from '../services/CountryService';
import { UpdateCityRequest } from './requests/UpdateCityRequest';
import { DeleteCityRequest } from './requests/DeleteCityRequest';

@JsonController('/city')
export class CityController {

    constructor(private cityService: CityService,
                private countryService: CountryService) { }

    // Create City API
    /**
     * @api {post} /api/city/add-city Add City API
     * @apiGroup City
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} name City Name
     * @apiParam (Request body) {Number} id Country Id
     * @apiParam (Request body) {Number} number isActive
     * @apiParamExample {json} Input
     * {
     *      "cityName": "",
     *      "countryId": "",
     *      "isActive": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new City.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/city/add-city
     * @apiErrorExample {json} City error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-city')
    @Authorized()
    public async addCity(@Body({ validate: true }) cityParam: AddCityRequest, @Res() response: any): Promise<any> {
        const isCityExists = await this.cityService.findOne({
            where: {
                cityName: cityParam.cityName,
                countryId: cityParam.countryId,
            },
        });
        const isCountryExist = await this.countryService.findOne({
            where: {
                countryId: cityParam.countryId,
            },
        });
        if (isCityExists) {
            const errorResponse: any = {
                status: 0,
                message: 'you already added this city.',
            };
            return response.status(200).send(errorResponse);
        } else {
            const city = new AllCities();
            city.cityName = cityParam.cityName;
            city.isActive = cityParam.isActive;
            // city.createdBy = cityParam.createdBy;
            // city.modifiedBy = cityParam.modifiedBy;
            if (isCountryExist) {

                city.countryId = cityParam.countryId;
            }
            const isSaveCity = await this.cityService.createCity(city);
            if (isSaveCity !== undefined) {
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully added new City.',
                    data: isSaveCity,
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Unable to add the City. ',
                };
                return response.status(400).send(errorResponse);
            }
        }
    }

    // Update City API
    /**
     * @api {post} /api/city/update-city Update City API
     * @apiGroup City
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id City Id
     * @apiParam (Request body) {String} name City Name
     * @apiParam (Request body) {Number} id Country Id
     * @apiParam (Request body) {Number} status isActive
     * @apiParamExample {json} Input
     * {
     *      "cityId": "",
     *      "cityName": "",
     *      "countryId": "",
     *      "isActive": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated city.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/city/update-city
     * @apiErrorExample {json} City error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-city')
    @Authorized()
    public async updateCity(@Body({ validate: true }) cityParam: UpdateCityRequest, @Res() response: any): Promise<any> {
        const isCityExists = await this.cityService.findOne({
            where: {
                cityId: cityParam.cityId,
            },
        });
        const isCountryExist = await this.countryService.findOne({
            where: {
                countryId: cityParam.countryId,
            },
        });
        if (!isCityExists) {
            const errorResponse: any = {
                status: 0,
                message: 'city id not Found.',
            };
            return response.status(200).send(errorResponse);
        } else {
            const city = new AllCities();
            city.cityName = cityParam.cityName;
            city.isActive = cityParam.isActive;
            if (isCountryExist) {
                city.countryId = cityParam.countryId;
            }
            const isSaveCity = await this.cityService.update(cityParam.cityId, city);
            if (isSaveCity !== undefined) {
                const successResponse: any = {
                    status: 1,
                    message: `Successfully updated city.`,
                    data: isSaveCity,
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Unable to update the City. ',
                };
                return response.status(400).send(errorResponse);
            }
        }
    }
    // Delete City API
    /**
     * @api {post} /api/city/delete-city Delete City API
     * @apiGroup City
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} id City Id
     * @apiParamExample {json} Input
     * {
     *      "cityId": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "City Deleted Successfully.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/city/update-city
     * @apiErrorExample {json} City error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-city')
    @Authorized()
    public async deleteCity(@Body({ validate: true }) deleteParam: DeleteCityRequest, @Res() response: any): Promise<any> {
        const isCityExists = await this.cityService.findOne({
            where: {
                cityId: deleteParam.cityId,
            },
        });
        if (!isCityExists) {
            const errorResponse: any = {
                status: 0,
                message: 'city id not Found.',
            };
            return response.status(200).send(errorResponse);
        } else {
            const isDeleteCity = await this.cityService.delete(deleteParam.cityId);
            if (isDeleteCity) {
                const successResponse: any = {
                    status: 1,
                    message: `City Deleted Successfully.`,
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Unable to delete the city. ',
                };
                return response.status(400).send(errorResponse);
            }
        }
    }

    // City List API
    /**
     * @api {get} /api/city/cityList City List API
     * @apiGroup City
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got city list",
     *      "data":{
     *      "cityId"
     *      "cityName"
     *      "countryId"
     *      "isActive"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/city/cityList
     * @apiErrorExample {json} City error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/cityList')
    @Authorized()
    public async cityList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count')count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['cityId', 'countryId', 'cityName', 'isActive'];
        const search = [
            {
                name: 'cityName',
                op: 'like',
                value: keyword,
            },
        ];

        const WhereConditions = [];

        const cityList: any = await this.cityService.list(limit, offset, select, search, WhereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got city count',
                data: cityList,
            };
            return response.status(200).send(successRes);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully got city list',
            data: cityList,
        };
        return response.status(200).send(successResponse);
    }
    // seperate City API
    /**
     * @api {get} /api/city/cityList?id="" City List API
     * @apiGroup City
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} cityId city ID
     * @apiParamExample {json} Input
     * {
     *      "cityId": ""
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got city",
     *      "data":{
     *      "cityId"
     *      "cityName"
     *      "countryId"
     *      "isActive"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/city/cityList?id=
     * @apiErrorExample {json} City error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/cityList')
    public async findCity(@QueryParam('id') id: number, @Res() response: any): Promise<any> {
        const isCity = await this.cityService.findOne({
            where: {
                cityId: id,
            },
        });
        if (isCity) {
            const successResponse: any = {
                status: 1,
                message: `Successfully got City.`,
                data: isCity,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to get city. ',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
