import user from '../modules/user';

class UserController {
    get(req, res) {
        const { id } = req.params;
        const result = user.get(id);

        if (!result) {
            return res.status(404).end('User not found!');
        }

        res.json(result);
    }

    add(req, res) {
        const { body } = req;

        res.json(user.add(body));
    }

    update(req, res) {
        const { id } = req.params;
        const { body } = req;

        res.json(user.update(id, body));
    }

    delete(req, res) {
        const { id } = req.params;

        res.json(user.delete(id));
    }

    list(req, res) {
        const { login, limit } = req.query;

        res.json(user.getAutoSuggestUsers(login, limit));
    }
}

const userController = new UserController();

export default userController;
