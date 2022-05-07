import 'reflect-metadata';
import { Authorized, Body, Get, JsonController, Param, Post, Put, /* QueryParam, */ Req, Res } from 'routing-controllers';
import { JWTkey } from '../../env';
import { MAILService } from '../../auth/mail.services';
import { Person } from '../models/Person';
import { LoginLogService } from '../services/LoginLogService';
import jwt from 'jsonwebtoken';
import { PersonService } from '../services/PersonService';
import { CreatePersonRequest } from './requests/CreatePersonRequest';
import { PersonLoginParamRequest } from './requests/PersonLoginParamRequest';
import { AccessToken } from '../models/AccessTokenModel';
import { AccessTokenService } from '../services/AccessTokenService';
import { LoginLog } from '../models/LoginLog';
import { ReturnResponseInterface } from '../../lib/logger/ReturnResponseInterface';
import { UpdatePersonRequest } from './requests/UpdatePersonRequest';
import { randomBytes } from 'crypto';
import { CashBalanceService } from '../services/CashBalanceService';
import { CashBalance } from '../models/CashBalance';
import { ChangePersonPasswordRequest } from './requests/ChangePersonPasswordRequest';

@JsonController('/users')
export class PersonController {

    constructor(
        private personService: PersonService,
        private loginLogService: LoginLogService,
        private accessTokenService: AccessTokenService,
        private cashBalanceService: CashBalanceService) { }

    @Post('/create-account')
    public async createPerson(@Body({ validate: true }) createPersonRequest: CreatePersonRequest, @Res() response: any): Promise<any> {
        const isExists = await this.personService.findOne({
            where: {
                emailId: createPersonRequest.emailId,
            },
        });
        if (isExists) {
            const returnResponse = {
                status: 0,
                message: 'Account already created with this email id',
            };
            return response.status(400).send(returnResponse);
        }
        const person = new Person();
        const randomPassword = Math.random().toString(36).substr(2, 12);
        console.log(randomPassword);
        const hashPassword = await Person.hashPassword(randomPassword);
        person.password = hashPassword;
        person.firstName = createPersonRequest.firstName;
        person.lastName = createPersonRequest.lastName;
        person.emailId = createPersonRequest.emailId;
        person.birthday = createPersonRequest.birthday;
        const messageContent = `<h3 style="font-size: 1.4em; font-weight: 900;">Welcome ${createPersonRequest.firstName + ' ' + createPersonRequest.lastName} !</h3>
        <p>We are glad to see you here.</p><p> Use the following username and password to login first time.</p>
        <p><span style="color: red">Note:</span> After login first time you are requested to update your password.</p><hr><hr>
        <p style="text-decoration: none">User Name: ${createPersonRequest.emailId}</p>
        <p>Password: ${randomPassword}</p><hr><hr>
        <p><b>Thanks &amp; Regards</b></p>
        <p>Skype<span></span> and team</p>`;

        console.log(messageContent);
        // await MAILService.registerMail(messageContent, createPersonRequest.emailId, 'Login Credentials - confidential');
        person.mailVerified = 0;
        person.activeStatus = 0;
        const is_saved = await this.personService.create(person);
        if (is_saved) {
            const returnResponse = {
                status: 1,
                message: 'Account Created Successfully Check your mail to login credentials',
                data: is_saved,
            };
            return response.status(200).send(returnResponse);
        } else {
            const returnResponse = {
                status: 0,
                message: 'Account cannot be created',
            };
            return response.status(400).send(returnResponse);
        }
    }

    // Login

    @Post('/login')
    public async login(@Body({ validate: true }) loginParam: PersonLoginParamRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        const isEmail = validateEmail(loginParam.userName);

        const isFirstTime = isEmail ? await this.loginLogService.findOne({
            where: {
                emailId: loginParam.userName,
            },
        }) : undefined;
        const isPerson = await this.personService.findOne({
            where: isEmail ? {
                emailId: loginParam.userName,
                deleteFlag: isFirstTime === undefined ? 1 : 0,
            } : {
                skypeName: loginParam.userName,
                deleteFlag: 0,
            },
        });

        if (isPerson) {
            if (await Person.comparePassword(isPerson, loginParam.password)) {
                const token = jwt.sign({ id: isPerson.personId }, JWTkey.KEY);
                let tokenSave: any;
                if (token) {
                    const newToken = new AccessToken();
                    newToken.userId = isPerson.personId;
                    newToken.token = token;
                    const personToken = await this.accessTokenService.findOne({ where: { userId: isPerson.personId } });
                    if (personToken === undefined) {
                        tokenSave = await this.accessTokenService.create(newToken);
                    } else {
                        tokenSave = await this.accessTokenService.update(personToken.id, newToken);
                    }
                }
                if (tokenSave) {
                    const loginLog = new LoginLog();
                    loginLog.emailId = isPerson.emailId;
                    loginLog.personId = isPerson.personId;
                    loginLog.firstName = isPerson.firstName;
                    loginLog.ipAddress = request.socket.remoteAddress;
                    await this.loginLogService.create(loginLog);

                    if (isEmail && isFirstTime === undefined) {
                        isPerson.deleteFlag = 0;
                        isPerson.mailVerified = 1;
                        isPerson.skypeName = 'live:.uuid_skype_' + randomBytes(8).toString('hex');
                        await this.personService.update(isPerson.personId, isPerson);
                        const cashBalance = new CashBalance();
                        cashBalance.opennigBalance = 0.00;
                        cashBalance.personId = isPerson.personId;
                        cashBalance.amount = 0.00;
                        cashBalance.inwardOrOutward = 0;
                        cashBalance.closingBalance = (cashBalance.inwardOrOutward === 0) ?
                            (cashBalance.opennigBalance + cashBalance.amount) :
                            (cashBalance.opennigBalance - cashBalance.amount);
                        await this.cashBalanceService.create(cashBalance);
                    }

                    const returnResponse: any = {
                        status: 1,
                        message: 'Loggedin successful',
                        data: {
                            token,
                            user: isPerson,
                        },
                    };
                    return response.status(200).send(returnResponse);
                } else {
                    const returnResponse = {
                        status: 0,
                        message: 'Token generation unsuccessfull',
                    };
                    return response.status(400).send(returnResponse);
                }
            } else {
                const returnResponse = {
                    status: 0,
                    message: 'Password doesnot match',
                };
                return response.status(400).send(returnResponse);
            }
        } else {
            const returnResponse = {
                status: 0,
                message: 'EmailId is not found',
            };
            return response.status(400).send(returnResponse);
        }
    }

    // @Get('/verify-token')
    // public async verifyToken(@QueryParam('token') token: string, @Res() response: any): Promise<any> {
    //     if (token) {

    //     }
    // }

    @Put('/update')
    @Authorized()
    public async update(@Body({ validate: true }) updatePersonRequest: UpdatePersonRequest, @Res() response: any): Promise<any> {

        const person = await this.personService.findOne({
            where: {
                personId: updatePersonRequest.personId,
                deleteFlag: 0,
            }, relations: ['status'],
        });

        if (person) {
            person.firstName = updatePersonRequest.firstName;
            person.lastName = updatePersonRequest.lastName;
            person.location = updatePersonRequest.location;
            person.profileImageId = updatePersonRequest.profileImageId;
            person.birthday = updatePersonRequest.birthday;
            person.activeStatus = updatePersonRequest.activeStatus;
            person.statusId = updatePersonRequest.statusId;

            const isUpdated = await this.personService.update(person.personId, person);
            if (isUpdated) {
                const returnResponse: ReturnResponseInterface = {
                    status: 1,
                    message: 'User updated successfully',
                    data: isUpdated,
                };
                return response.status(200).send(returnResponse);
            } else {
                const returnResponse: ReturnResponseInterface = {
                    status: 0,
                    message: 'User not updated',
                };
                return response.status(400).send(returnResponse);
            }
        } else {
            const returnResponse: ReturnResponseInterface = {
                status: 0,
                message: 'User Id not found',
            };
            return response.status(400).send(returnResponse);
        }
    }

    // Person Detail

    @Get('/detail')
    @Authorized()
    public async personDetail(@Req() request: any, @Res() response: any): Promise<any> {
        const person = await this.personService.findOne({
            where: {
                personId: request.user.personId,
                deleteFlag: 0,
            },
            select: ['personId', 'firstName', 'lastName', 'skypeName', 'emailId', 'password', 'location',
                'birthday', 'mailVerified', 'status', 'profileImage'],
            relations: ['status', 'profileImage'],
        });
        if (person !== undefined) {
            const returnResponse: ReturnResponseInterface = {
                status: 1,
                message: 'User detail fetched successfully',
                data: person,
            };
            return response.status(200).send(returnResponse);
        } else {
            const returnResponse: ReturnResponseInterface = {
                status: 0,
                message: 'User Id not found',
            };
            return response.status(400).send(returnResponse);
        }
    }

    // @Get('/username')
    // public async getUsername(@QueryParam('username') username: string, @Res() response: any): Promise<ReturnResponseInterface> {

    //     return;
    // }

    @Put('/change-password')
    @Authorized()
    public async changePassword(@Body({ validate: true }) changePassword: ChangePersonPasswordRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const person = await this.personService.findOne({
            where: {
                personId: request.user.personId,
                deleteFlag: 0,
            },
        });

        if (person) {
            if (await Person.comparePassword(person, changePassword.oldPassword)) {
                if (!await Person.comparePassword(person, changePassword.newPassword)) {
                    if (changePassword.newPassword === changePassword.confirmPassword) {
                        const hashedPassword = await Person.hashPassword(changePassword.newPassword);
                        person.password = hashedPassword;
                        const passwordChanged = await this.personService.update(person.personId, person);
                        if (passwordChanged) {
                            const create_flushipassword = () => {
                                const regStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-={}|[]<>?,./~`1234567890';
                                let tempstr: string = person.personId.toString();
                                for (const char of changePassword.newPassword) {
                                    tempstr += '-' + regStr.indexOf(char).toString();
                                }
                                return tempstr;
                            };
                            const messageContent = `<h3 style="font-size: 1.4em; font-weight: 900;">Greetings ${person.firstName + ' ' + person.lastName} !</h3>
                                                    <p>Your request to change password has been completed and your password was changed</p><hr><hr>
                                                    <p>Click <a href="http://localhost:5000/api/users/change-password/${create_flushipassword()}" target="_self">this link</a> to get password in your mail
                                                    <hr><hr>
                                                    <p><b>Thanks &amp; Regards</b></p>
                                                    <p>Skype<span></span> and team</p>`;
                            await MAILService.registerMail(messageContent, person.emailId, 'Password Changed - Success');

                            const returnResponse: ReturnResponseInterface = {
                                status: 1,
                                message: 'Password Changed Successfully',
                            };

                            return response.status(200).send(returnResponse);
                        } else {
                            const returnResponse: ReturnResponseInterface = {
                                status: 0,
                                message: 'Password Not Changed',
                            };

                            return response.status(200).send(returnResponse);
                        }
                    } else {
                        const returnResponse: ReturnResponseInterface = {
                            status: 0,
                            message: 'New password and Confirm Password are not same',
                        };

                        return response.status(200).send(returnResponse);
                    }
                } else {
                    const returnResponse: ReturnResponseInterface = {
                        status: 0,
                        message: 'New password should not be same as Old Password',
                    };

                    return response.status(200).send(returnResponse);
                }
            } else {
                const returnResponse: ReturnResponseInterface = {
                    status: 0,
                    message: 'Old password is wrong',
                };

                return response.status(200).send(returnResponse);
            }
        } else {
            const returnResponse: ReturnResponseInterface = {
                status: 0,
                message: 'User Not found',
            };

            return response.status(200).send(returnResponse);
        }
    }

    @Get('/change-password/:key')
    public async passwordonMail(@Param('key') key: string, @Res() response: any): Promise<any> {
        const regStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-={}|[]<>?,./~`1234567890';
        const keyArr = key.split('-');
        let originalPassword = '';
        const person = await this.personService.findOne({
            where: {
                personId: keyArr[0],
                deleteFlag: 0,
            },
        });
        if (person) {
            keyArr.forEach((charCode) => {
                if (keyArr[0] !== charCode) {
                    originalPassword += regStr.charAt(parseInt(charCode, 10));
                }
            });
            const messageContent = `<h3 style="font-size: 1.4em; font-weight: 900;">Keep it secret ${person.firstName + ' ' + person.lastName} !</h3>
                    <p>We are glad to see you here again.</p><p> Use the following username and password to login.</p>
                    <p><span style="color: red">Note:</span>You can change your password at any time by visiting <b>Profile &gt; Settings &gt; Change Password</b>.</p><hr><hr>
                    <p style="text-decoration: none">User Name: ${person.emailId}</p>
                    <p>Password: ${originalPassword}</p><hr><hr>
                    <p><b>Thanks &amp; Regards</b></p>
                    <p>Skype<span class="material-symbols-outlined">content_copy</span> and team</p>`;
            await MAILService.registerMail(messageContent, person.emailId, 'Login Credentials - confidential');
            const returnResponse: ReturnResponseInterface = {
                status: 1,
                message: 'Password sent to mail Successfully',
            };

            return response.status(200).send(returnResponse);
        } else {
            const returnResponse: ReturnResponseInterface = {
                status: 0,
                message: 'User Not found',
            };

            return response.status(200).send(returnResponse);
        }
    }
    @Get('/usersList')
    public async getUsersList(@Req() request: any, @Res() response: any): Promise<any> {
        const persons = await this.personService.find({
            where: {
                deleteFlag: 0,
            },
        });

        if (persons) {
            const returnResponse: ReturnResponseInterface = {
                status: 1,
                message: 'Password sent to mail Successfully',
                data: persons,
            };

            return response.status(200).send(returnResponse);
        } else {
            const returnResponse: ReturnResponseInterface = {
                status: 0,
                message: 'User Not found',
            };

            return response.status(200).send(returnResponse);
        }
    }
    @Get('/find-user/:username')
    public async findUserName(@Param('username') username: string, @Res() response: any): Promise<any> {
        const whereConditions = [
            { deleteFlag: '0' },
        ];

        const select = ['Person.emailId', 'Person.skypeName'];

        const search = [
            {
                name: ['Person.emailId', 'Person.skypeName'],
                value: username.toLowerCase(),
                op: 'where',
            },
        ];

        const person_list = await this.personService.listByQueryBuilder(0, 0, select, whereConditions, search, [], [], [], 0, false);
        if (person_list instanceof Array && person_list.length > 0) {
            const returnResponse: ReturnResponseInterface = {
                status: 1,
                message: 'User mail get Successfully',
                data: person_list,
            };

            return response.status(200).send(returnResponse);
        } else {
            const returnResponse: ReturnResponseInterface = {
                status: 0,
                message: 'User Not found',
            };

            return response.status(200).send(returnResponse);
        }
    }
}
