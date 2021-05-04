module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('groups', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: new Sequelize.STRING(128),
                allowNull: false
            },
            permissions: {
                type: new Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('groups');
    }
};

