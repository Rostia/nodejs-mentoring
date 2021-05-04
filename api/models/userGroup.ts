import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/connect';

class userGroup extends Model {
    UserId!: number;
    GroupId: string;
}

userGroup.init(
    {
        UserId: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true
        },
        GroupId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        }
    },
    {
        tableName: 'UserGroup',
        sequelize,
        timestamps: false
    },
);

export default userGroup;
