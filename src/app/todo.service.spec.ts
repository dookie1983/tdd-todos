import { ITodo } from './interfaces/ITodo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();

  });

  it('should be created with empty list', () => {
    expect(service.count()).toEqual(0);
  });

  it('should return 1 if add new todo to empty list', () => {
    const todoItem: ITodo = {
      todo: 'New Item',
      description: 'New Item Description'
    };
    service.add(todoItem);
    expect(service.count()).toEqual(1);
  });

  it('should return the number of items if add new todo to non-empty list', () => {
    const todoItem1: ITodo = {
      todo: 'New Item',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      todo: 'New Item',
      description: 'New Item Description'
    };
    service.add(todoItem1);
    service.add(todoItem2);
    expect(service.count()).toEqual(2);
  });

  it('should return the number of items if remove a todo from non-empty list', () => {
    const todoItem1: ITodo = {
      todo: 'New Item',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      todo: 'New Item',
      description: 'New Item Description'
    };
    const todoItem3: ITodo = {
      todo: 'New Item',
      description: 'New Item Description'
    };
    service.add(todoItem1);
    service.add(todoItem2);
    service.add(todoItem3);
    service.remove(2);
    expect(service.count()).toEqual(2);
  });

  it('should return the number of items if remove a non-existing todo from non-empty list', () => {
    const todoItem1: ITodo = {
      todo: 'New Item',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      todo: 'New Item',
      description: 'New Item Description'
    };
    const todoItem3: ITodo = {
      todo: 'New Item',
      description: 'New Item Description'
    };
    service.add(todoItem1);
    service.add(todoItem2);
    service.add(todoItem3);
    service.remove(3);
    expect(service.count()).toEqual(3);
  });

  it('should return the number of items if remove a negative todo index from non-empty list', () => {
    const todoItem1: ITodo = {
      todo: 'New Item',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      todo: 'New Item',
      description: 'New Item Description'
    };
    const todoItem3: ITodo = {
      todo: 'New Item',
      description: 'New Item Description'
    };
    service.add(todoItem1);
    service.add(todoItem2);
    service.add(todoItem3);
    service.remove(-1);
    expect(service.count()).toEqual(3);
  });

  it('should return todo item', () => {
    const todoItem1: ITodo = {
      todo: 'New Item 1',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      todo: 'New Item 2',
      description: 'New Item Description'
    };
    const todoItem3: ITodo = {
      todo: 'New Item 3',
      description: 'New Item Description'
    };
    service.add(todoItem1);
    service.add(todoItem2);
    service.add(todoItem3);
    const result = service.get(1);
    expect(result).toEqual(todoItem2);
  });
});
