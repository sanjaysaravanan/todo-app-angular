type Todo = {
  title: string;
  isCompleted: boolean;
  id: string;
}

const storageTodos = window.localStorage.getItem('todos');

export const ToDos: Todo[] = storageTodos ? JSON.parse(storageTodos) : [];