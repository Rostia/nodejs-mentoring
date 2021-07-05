import { Request, Response, NextFunction } from 'express';
import UserService from '../secvices/user.service';
import AuthService from '../secvices/auth.service';

class AuthorizationController {
    private authService: AuthService;
    private userService: UserService;

    constructor() {
        this.authService = new AuthService();
        this.userService = new UserService();
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {
                login,
                password
            } = req.body;

            const user = await this.userService.getByLogAndPass(login, password);
            const token = this.authService.auth(user);

            res.json(token);
        } catch (error) {
            return next(error);
        }
    }
}

export default AuthorizationController;
