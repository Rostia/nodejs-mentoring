import db from '../db';
import UserType from '../types/user';
import { v4 as uuidv4 } from 'uuid';

const userTemplate: UserType = {
    id: '',
    login: '',
    password: '',
    age: NaN,
    isDeleted: false
};

class User {
    get(id: string): UserType | undefined {
        return db.users.find(({ id: userId }) => userId === id);
    }

    add(user: UserType): UserType {
        const newUser: UserType = {
            ...userTemplate,
            id: uuidv4(),
            ...user
        };
        db.users.push(newUser);

        return newUser;
    }

    update(id: string, user: UserType) {
        const index = this.getIndex(id);

        db.users[index] = {
            ...db.users[index],
            ...user
        };
    }

    delete(id: string) {
        const index = this.getIndex(id);

        db.users[index] = {
            ...db.users[index],
            isDeleted: true
        };
    }

    getAutoSuggestUsers(loginSubstring: string = '', limit: number = 20): Array<UserType> {
        let resultList = [...db.users];

        if (loginSubstring) {
            resultList = resultList.filter(({ login }) => login.indexOf(loginSubstring) !== -1);
        }

        return resultList.slice(0, limit);
    }

    getIndex(id: string): number {
        return db.users.findIndex(({ id: userId }) => userId === id);
    }

    exist(id: string): boolean {
        if (this.getIndex(id) !== -1) {
            return true;
        }

        return false;
    }
}

const user = new User();

export default user;
