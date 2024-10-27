export const addTodo = async (todo: string, completed: boolean, userId: number): Promise<any> => {
    const response = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo, completed, userId }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
  
    return response.json();
  };
  