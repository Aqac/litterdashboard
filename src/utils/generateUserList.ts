import {type User} from '../model/user';
import { faker } from '@faker-js/faker';

export default function generateUserList(count: number): User[] {
    const users:User[] = [];
    for (let i=0; i< count; i++)
    {
        users.push({
            key: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: faker.helpers.weightedArrayElement([
                { weight: 0.1, value: 'admin' },
                { weight: 0.8, value: 'user' },
                { weight: 0.1, value: 'guest' },
            ]),
            status: faker.helpers.weightedArrayElement([
                { weight: 0.7, value: 'active' },
                { weight: 0.2, value: 'inactive' },
                { weight: 0.05, value: 'suspended' },
                { weight: 0.05, value: 'pending' },
            ]),
        });
    }
    return users;
}