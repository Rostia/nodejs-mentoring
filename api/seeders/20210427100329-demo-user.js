module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('users', [{
            login: 'test@gmail.com',
            password: 'qwerty',
            age: 15,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            login: 'my_test@mail.ru',
            password: 'daspmoqew',
            age: 35,
            isDeleted: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            login: 'qwer@gmail.com',
            password: '5156e56qwedsa132wqe',
            age: 2,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            login: 'mine@mail.ru',
            password: 'qwedsaxcze',
            age: 15,
            isDeleted: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            login: 'mine@mail2.ru',
            password: 'qwedsaxcz2e',
            age: 15,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            login: 'qwer@gmail.com',
            password: '5156e56qwedsa132wqe',
            age: 2,
            isDeleted: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            login: 'test2@gmail.com',
            password: '5156e56qwedsa132wqe',
            age: 22,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ]);
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
