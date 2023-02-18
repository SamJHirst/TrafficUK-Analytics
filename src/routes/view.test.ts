import { Request, Response } from 'express';

const mockLogPageView = jest.fn();

jest.mock(('../controllers/ViewController'), () => ({
    logPageView: mockLogPageView,
}));

import {
    logPageView,
} from './view';

beforeEach(() => {
    mockLogPageView.mockReset();
});

describe('logPageView', () => {
    it('should call the logPageView method of ViewController', async () => {
        const mockReq = {
            body: {
                cookieId: 'abc',
                path: '/',
                sessionId: '123',
            },
        } as unknown as Request;
        const mockRes = {
            sendStatus: jest.fn(),
        } as unknown as Response;

        expect.assertions(2);

        await logPageView(mockReq, mockRes);

        expect(mockLogPageView).toBeCalledTimes(1);
        expect(mockLogPageView).toBeCalledWith('abc', '/', '123');
    });

    it('should return a 204 status', async () => {
        const mockResSendStatus = jest.fn();
    
        const mockReq = {
            body: {},
        } as unknown as Request;
        const mockRes = {
            sendStatus: mockResSendStatus,
        } as unknown as Response;

        expect.assertions(2);

        await logPageView(mockReq, mockRes);

        expect(mockResSendStatus).toBeCalledTimes(1);
        expect(mockResSendStatus).toBeCalledWith(204);
    });
});