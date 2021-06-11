import GroupController from './group.controller';
import GroupService from '../secvices/group.service';
import httpMocks from 'node-mocks-http';
import mockGroup from '../test/mocks/group';

jest.mock('../secvices/group.service');

const mockedGroupService = <jest.Mock<GroupService>>GroupService;
const controller = new GroupController();
const addRouter = controller.add.bind(controller);
const getRouter = controller.get.bind(controller);
const updateRouter = controller.update.bind(controller);
const deleteRouter = controller.delete.bind(controller);
const addUserRouter = controller.addUser.bind(controller);

const groupServiceInstance = mockedGroupService.mock.instances[0];

const errorMessage = { message: 'Error' };
const rejectedPromise = Promise.reject(errorMessage);

let req; let res; let next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe('GroupController.get', () => {
    it('should return response with status 200 and get group', async () => {
        req.params.id = mockGroup.id;
        groupServiceInstance.getById = jest.fn().mockReturnValue(mockGroup);
        await getRouter(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
        expect(res._getJSONData()).toStrictEqual(mockGroup);
    });

    it('should handle errors', async () => {
        groupServiceInstance.getById = jest.fn().mockReturnValue(rejectedPromise);

        await getRouter(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('GroupController.add', () => {
    it('should return json body in response', async () => {
        groupServiceInstance.create = jest.fn().mockReturnValue(mockGroup);
        await addRouter(req, res, next);
        expect(res._getJSONData()).toStrictEqual(mockGroup);
    });

    it('should handle errors', async () => {
        groupServiceInstance.create = jest.fn().mockReturnValue(rejectedPromise);

        await addRouter(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('GroupController.update', () => {
    beforeEach(() => {
        req.body = { ...mockGroup, login: 'newLogin@test.com' };
    });

    it('should return json body in response', async () => {
        groupServiceInstance.update = jest.fn().mockReturnValue({ ...mockGroup, login: 'newLogin@test.com' });
        await updateRouter(req, res, next);
        expect(res._getJSONData()).toStrictEqual({ ...mockGroup, login: 'newLogin@test.com' });
    });

    it('should handle errors', async () => {
        groupServiceInstance.update = jest.fn().mockReturnValue(rejectedPromise);

        await updateRouter(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('GroupController.delete', () => {
    it('should return json body in response', async () => {
        groupServiceInstance.delete = jest.fn().mockReturnValue(mockGroup);
        await deleteRouter(req, res, next);

        expect(res._getJSONData()).toStrictEqual(mockGroup);
    });

    it('should handle errors', async () => {
        groupServiceInstance.delete = jest.fn().mockReturnValue(rejectedPromise);

        await deleteRouter(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});

describe('GroupController.addUser', () => {
    it('should return json body in response', async () => {
        groupServiceInstance.addUsersToGroup = jest.fn();
        await addUserRouter(req, res, next);

        expect(res._getJSONData()).toStrictEqual({});
    });

    it('should handle errors', async () => {
        groupServiceInstance.addUsersToGroup = jest.fn().mockReturnValue(rejectedPromise);

        await addUserRouter(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
    });
});
