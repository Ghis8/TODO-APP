// addTodo.test.ts
import { addTodo } from '../mock/addTask';

describe('addTodo', () => {
  const todoText = 'Use DummyJSON in the project';
  const completedStatus = false;
  const userId = 5;
  const apiUrl = 'https://dummyjson.com/todos/add';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a POST request with the correct payload and return the response', async () => {
    const mockResponse = { id: 1, todo: todoText, completed: completedStatus, userId };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    const result = await addTodo(todoText, completedStatus, userId);
    expect(fetch).toHaveBeenCalledWith(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: todoText, completed: completedStatus, userId }),
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

    await expect(addTodo(todoText, completedStatus, userId)).rejects.toThrow('Failed to add task');
    expect(fetch).toHaveBeenCalledWith(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: todoText, completed: completedStatus, userId }),
    });
  });
});
