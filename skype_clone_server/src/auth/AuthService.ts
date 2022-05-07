import * as express from 'express';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../decorators/Logger';
import { JWTkey } from '../env';
import { PersonRepository } from '../api/repositories/PersonRepository';
import { Person } from '../api/models/Person';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private userRepository: PersonRepository
    ) { }

    public async parseBasicAuthFromRequest(req: express.Request): Promise<number> {
        const authorization = req.header('authorization');

        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            this.log.info('Credentials provided by the client');
            if (!authorization) {
                return undefined;
            } else {
                const UserId = await this.decryptToken(authorization.split(' ')[1]);

                return UserId;
            }
        } else {
            this.log.error('No credentials provided by the client');
            return undefined;
        }
    }

    public async decryptToken(encryptString: string): Promise<number> {
        return new Promise<number>((subresolve, subreject) => {
            jwt.verify(encryptString, JWTkey.KEY, (err, decoded) => {
                if (err) {
                    return subresolve(undefined);
                }
                return subresolve(decoded.id);
            });
        });
    }

    public async validateUser(personId: number): Promise<Person> {
        const user = await this.userRepository.findOne({
            where: {
                personId,
            },
        });
        if (user) {
            return user;
        }

        return undefined;
    }

    // public async validateCustomer(userId: number): Promise<any> {
    //     const customer = await this.customerRepository.findOne({
    //         where: {
    //             id: userId,
    //         },
    //     });

    //     if (customer) {
    //         return customer;
    //     }

    //     return undefined;
    // }

}
