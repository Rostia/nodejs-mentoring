import db from '../db';
import { v4 as uuidv4 } from 'uuid';

const userTemplate = {
    id: '',
    login: '',
    password: '',
    age: null,
    isDeleted: false
};

class User {
    get(id) {
        return db.users.find(({ id: userId }) => userId === id);
    }

    add(user) {
        const newUser = {
            ...userTemplate,
            id: uuidv4(),
            ...user
        };
        db.users.push(newUser);

        return newUser;
    }

    update(id, user) {
        const newUser = Object.assign({}, user);
        delete newUser.id;
        const index = db.users.findIndex(({ id: userId }) => userId === id);

        if (index === -1) {
            throw new Error(`Doesn't exist user with ${id} ID`);
        }

        db.users[index] = {
            ...db.users[index],
            ...newUser
        };
    }

    delete(id) {
        const index = db.users.findIndex(({ id: userId }) => userId === id);

        if (index === -1) {
            throw new Error(`Doesn't exist user with ${id} ID`);
        }

        db.users[index] = {
            ...db.users[index],
            isDeleted: true
        };
    }

    getAutoSuggestUsers(loginSubstring = '', limit = 20) {
        let resultList = [...db.users];

        if (loginSubstring) {
            resultList = resultList.filter(({ login }) => login.indexOf(loginSubstring) !== -1);
        }

        return resultList.slice(0, limit);
    }
}

const user = new User();

export default user;
