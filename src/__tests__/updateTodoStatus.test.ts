// updateTodoStatus.test.ts
import { updateTodoStatus } from '../mock/updateTodoStatus';

describe('updateTodoStatus', () => {
  const todoId = 1;
  const completedStatus = false;
  const apiUrl = `https://dummyjson.com/todos/${todoId}`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a PUT request with the correct payload and return the response', async () => {
    const mockResponse = { id: todoId, completed: completedStatus };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    const result = await updateTodoStatus(todoId, completedStatus);
    expect(fetch).toHaveBeenCalledWith(apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: completedStatus }),
    });
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the API response is not ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      } as Response)
    );

    await expect(updateTodoStatus(todoId, completedStatus)).rejects.toThrow('Failed to update todo status');
    expect(fetch).toHaveBeenCalledWith(apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: completedStatus }),
    });
  });
});
