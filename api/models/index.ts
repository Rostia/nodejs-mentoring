import User from './user';
import Group from './group';
import UserGroup from './userGroup';


User.belongsToMany(Group, { through: 'UserGroup', timestamps: false, onDelete: 'cascade' });
Group.belongsToMany(User, { through: 'UserGroup', timestamps: false, onDelete: 'cascade' });

export {
    User,
    Group,
    UserGroup
};
