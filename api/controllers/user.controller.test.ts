import UserController from './user.controller';
import UserService from '../secvices/user.service';
import httpMocks from 'node-mocks-http';
import mockUser from '../test/mocks/user';
import mockUsersList from '../test/mocks/users-list';

jest.mock('../secvices/user.service');

const mockedUserService = <jest.Mock<UserService>>UserService;
const controller = new UserController();
const addRouter = controller.add.bind(controller);
const getRouter = controller.get.bind(controller);
const updateRouter = controller.update.bind(controller);
const deleteRouter = controller.delete.bind(controller);
const listRouter = controller.list.bind(controller);

const userServiceInstance = mockedUserService.mock.instances[0];

const errorMessage = { message: 'Error' };
const rejectedPromise = Promise.reject(errorMessage);

let req; let res; let next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('UserController.get', () => {
    it('should be a function', () => {
        expect(typeof getRouter).toBe('function');
    });

    it('should call UserService.getById({})', async () => {
        req.params.id = mockUser.id;
        await getRouter(req, res, next);
        expect(userServiceInstance.getById).toHaveBeenCalledWith(mockUser.id);
    });

    it('should return response with status 200 and get user', async () => {
        req.params.id = mockUser.id;
        userServiceInstance.getById = jest.fn().mockReturnValue(mockUser);
        await getRouter(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(mockUser);
    });

    it('should handle errors', async () => {
        userServiceInstance.getById = jest.fn().mockReturnValue(rejectedPromise);

        await getRouter(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('UserController.add', () => {
    it('should have a add function', () => {
        expect(typeof addRouter).toBe('function');
    });

    it('should call TodoModel.create', async () => {
        expect(userServiceInstance.create).toHaveBeenCalledTimes(0);
        await addRouter(req, res, next);
        expect(userServiceInstance.create).toHaveBeenCalledTimes(1);
    });

    it('should return 201 response code', async () => {
        await addRouter(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        userServiceInstance.create = jest.fn().mockReturnValue(mockUser);
        await addRouter(req, res, next);
        expect(res._getJSONData()).toStrictEqual(mockUser);
    });

    it('should handle errors', async () => {
        userServiceInstance.create = jest.fn().mockReturnValue(rejectedPromise);

        await addRouter(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('UserController.update', () => {
    beforeEach(() => {
        req.body = { ...mockUser, login: 'newLogin@test.com' };
    });

    it('should have a updateRouter function', () => {
        expect(typeof updateRouter).toBe('function');
    });

    it('should call UserService.update', async () => {
        req.params.id = mockUser.id;
        await updateRouter(req, res, next);
        expect(userServiceInstance.update).toBeCalledWith(mockUser.id, { ...mockUser, login: 'newLogin@test.com' });
    });

    it('should return 200 response code', async () => {
        await updateRouter(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        userServiceInstance.update = jest.fn().mockReturnValue({ ...mockUser, login: 'newLogin@test.com' });
        await updateRouter(req, res, next);
        expect(res._getJSONData()).toStrictEqual({ ...mockUser, login: 'newLogin@test.com' });
    });

    it('should handle errors', async () => {
        userServiceInstance.update = jest.fn().mockReturnValue(rejectedPromise);

        await updateRouter(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('UserController.delete', () => {
    it('should have a delete router function', () => {
        expect(typeof deleteRouter).toBe('function');
    });

    it('should call UserService.delete', async () => {
        req.params.id = mockUser.id;
        await deleteRouter(req, res, next);
        expect(userServiceInstance.delete).toBeCalledWith(mockUser.id);
    });

    it('should return 200 response code', async () => {
        await deleteRouter(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        userServiceInstance.delete = jest.fn().mockReturnValue(mockUser);
        await deleteRouter(req, res, next);

        expect(res._getJSONData()).toStrictEqual(mockUser);
    });

    it('should handle errors', async () => {
        userServiceInstance.delete = jest.fn().mockReturnValue(rejectedPromise);

        await deleteRouter(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('UserController.list', () => {
    it('should have a delete router function', () => {
        expect(typeof listRouter).toBe('function');
    });

    it('should call UserService.delete', async () => {
        req.query.login = '';
        req.query.limit = 5;
        await listRouter(req, res, next);
        expect(userServiceInstance.search).toBeCalledWith('', 5);
    });

    it('should return 200 response code', async () => {
        await listRouter(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        userServiceInstance.search = jest.fn().mockReturnValue(mockUsersList);
        await listRouter(req, res, next);

        expect(Array.isArray(res._getJSONData())).toBeTruthy();
    });

    it('should handle errors', async () => {
        userServiceInstance.search = jest.fn().mockReturnValue(rejectedPromise);

        await listRouter(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});
