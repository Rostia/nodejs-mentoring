import jwt from 'jsonwebtoken';
import { User } from '../models';

const {
    JWT_SECRET
} = process.env;

class AuthService {
    public auth(user: User): string {
        const token = jwt.sign({
            id: user.id,
            login: user.login,
            isDeleted: user.isDeleted,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, JWT_SECRET);

        return token;
    }

    public isCorrect(token: string): boolean {
        try {
            jwt.verify(token, JWT_SECRET);

            return true;
        } catch (error) {
            return false;
        }
    }
}

export default AuthService;
