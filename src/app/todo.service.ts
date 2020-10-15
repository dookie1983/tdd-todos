import { Injectable } from '@angular/core';
import { ITodo } from './interfaces/ITodo';

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

  count(): number {
    return this.todo.length;
  }

  get(index: number): ITodo {
    return this.todo[index];
  }
}
