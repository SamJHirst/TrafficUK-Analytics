const mockViewConstructor = jest.fn();
const mockViewSave = jest.fn();

class MockView {
    constructor(...args: unknown[]) {
        return mockViewConstructor(...args);
    }
}


jest.mock('../models/View', () => ({
    View: MockView,
}));

import ViewController from './ViewController';

beforeEach(() => {
    mockViewConstructor.mockReset();
    mockViewSave.mockReset();

    mockViewConstructor.mockReturnValue({
        save: mockViewSave,
    });
});

describe('ViewController.logPageView', () => {
    it('should create a new page view object with the correct arguments', async () => {
        expect.assertions(2);

        await ViewController.logPageView('abc', '/', '123');

        expect(mockViewConstructor).toBeCalledTimes(1);
        expect(mockViewConstructor).toBeCalledWith(expect.objectContaining({
            cookieId: 'abc',
            path: '/',
            sessionId: '123',
        }));
    });

    it('should call the save method with no arguments', async () => {
        expect.assertions(2);

        await ViewController.logPageView('abc', '/', '123');

        expect(mockViewSave).toBeCalledTimes(1);
        expect(mockViewSave).toBeCalledWith();
    });
});
