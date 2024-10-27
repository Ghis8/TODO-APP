export const fetchTodos = async (limit: number, skip: number): Promise<any> => {
    const response = await fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`);
  
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
  
    return response.json();
  };
  