// fetchTodos.test.ts
import { fetchTodos } from '../mock/getTasksWithLimits';

describe('fetchTodos', () => {
  const limit = 3;
  const skip = 10;
  const apiUrl = `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch todos with the correct query parameters and return the response', async () => {
    const mockResponse = { todos: [{ id: 1, todo: 'Sample todo' }, { id: 2, todo: 'Another todo' }] };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    const result = await fetchTodos(limit, skip);
    expect(fetch).toHaveBeenCalledWith(apiUrl);
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the API response is not ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      } as Response)
    );

    await expect(fetchTodos(limit, skip)).rejects.toThrow('Failed to fetch tasks');
    expect(fetch).toHaveBeenCalledWith(apiUrl);
  });
});
