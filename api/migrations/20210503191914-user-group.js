module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UserGroup', {
            GroupId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            UserId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            timestamps: false
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('UserGroup');
    }
};
