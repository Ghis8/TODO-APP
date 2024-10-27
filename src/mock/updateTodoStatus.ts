export const updateTodoStatus = async (id: number, completed: boolean): Promise<any> => {
    const response = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update todo status');
    }
  
    return response.json();
  };
  