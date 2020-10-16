import { Injectable } from '@angular/core';
import { ITodo } from '../interfaces/ITodo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todo: ITodo[];

  constructor() {
    this.todo = [];
  }

  add(item: ITodo): void {
    this.todo.push(item);
  }

  remove(index: number): void {
    this.todo = this.todo.filter((_, i) => i !== index);
  }

  get(index: number): ITodo {
    if ((0 <= index) && (index < this.todo.length)) {
      return this.todo[index];
    }
    return null;
  }

  all(): ITodo[] {
    return this.todo;
  }

  update(index: number, newTodo : ITodo): void {
    if ((0 <= index) && (index < this.todo.length)) {
      this.todo[index] = newTodo;
    }
  }
}
