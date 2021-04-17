import sequelize from './connect';
import UserService from '../secvices/user.service';

const init = async () => {
    await sequelize.sync({
        force: true
    });

    await UserService.create({
        login: 'qwerty3@gmail.com',
        password: '123qwe321',
        age: 5
    });
    await UserService.create({
        login: 'abc@gmail.com',
        password: '123qwe321',
        age: 5
    });
    await UserService.create({
        login: 'qwerty@gmail.com',
        password: '123qwe321',
        age: 32
    });
    await UserService.create({
        login: 'test123@gmail.com',
        password: '123qwe321',
        age: 18
    });
    await UserService.create({
        login: 'test@gmail.com',
        password: '123qwe321',
        age: 20
    });
};

init();
