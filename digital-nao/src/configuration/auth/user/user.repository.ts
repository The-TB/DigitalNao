import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {

    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    mapToUsers(rawResults: any[]): User[] {
        return rawResults.map((row: any) => {
            const user = new User();
            user.id = row.ID;
            user.username = row.USERNAME;
            user.email = row.EMAIL;
            user.password = row.PASSWORD;
            return user;
        });
    }
    
    async getUsers(): Promise<User[]> {
        try {
            const [rawResult] = await this.dataSource.query('CALL AUTH.GET_USERS()');
            console.log('Raw Results:', rawResult);
            const result = rawResult as any[];
            return this.mapToUsers(result);
        } catch (e) {
            console.error('getUsers -> Error.', e);
            throw e;
        }
    }
}
