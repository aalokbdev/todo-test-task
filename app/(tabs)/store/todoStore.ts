import { create } from "zustand";

type Todo = {
  id: number;
  text: string;
};

type TodoState = {
  todos: Todo[];
  addTodo: (text: string) => void;
  updateTodo: (id: number, text: string) => void;
  deleteTodo: (id: number) => void;
};

export const useTodoStore = create<TodoState>((set: any) => ({
  todos: [],
  addTodo: (text: any) =>
    set((state: any) => ({
      todos: [{ id: Date.now(), text }, ...state.todos],
    })),
  updateTodo: (id, newText) =>
    set((state: any) => ({
      todos: state.todos.map((todo: any) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    })),
  deleteTodo: (id: any) =>
    set((state: any) => ({
      todos: state.todos.filter((todo: any) => todo.id !== id),
    })),
}));
