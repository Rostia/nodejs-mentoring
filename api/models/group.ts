import { Model, DataTypes, HasManyGetAssociationsMixin } from 'sequelize';
import Permission from '../types/permission';
import sequelize from '../db/connect';
import User from './user';

class Group extends Model {
    id!: string;
    name: string;
    permissions: Array<Permission>;

    public getUsers!: HasManyGetAssociationsMixin<User>;
}

Group.init(
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        permissions: {
            type: new DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    },
    {
        tableName: 'groups',
        sequelize
    }
);

export default Group;
