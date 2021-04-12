import UserType from '../types/user';
type DbType = {
    users: Array<UserType>
}

const db: DbType = {
    users: []
};

export default db;
export {
    DbType
};
