import { ITodo } from '../interfaces/ITodo';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();
  });

  it('should be created with empty list', () => {
    const expected = [];
    expect(service.all()).toEqual(expected);
  });

  it('should return 1 if add new todo to empty list', () => {
    const todoItem: ITodo = {
      topic: 'New Item',
      description: 'New Item Description'
    };
    const expected = [
      todoItem,
    ];
    service.add(todoItem);
    expect(service.all()).toEqual(expected);
  });

  it('should return the number of items if add new todo to non-empty list', () => {
    const todoItem1: ITodo = {
      topic: 'New Item',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      topic: 'New Item',
      description: 'New Item Description'
    };
    const expected = [
      todoItem1,
      todoItem2
    ];
    service.add(todoItem1);
    service.add(todoItem2);
    expect(service.all()).toEqual(expected);
  });

  it('should return the number of items if remove a todo from non-empty list', () => {
    const todoItem1: ITodo = {
      topic: 'New Item',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      topic: 'New Item',
      description: 'New Item Description'
    };
    const todoItem3: ITodo = {
      topic: 'New Item',
      description: 'New Item Description'
    };
    const expected = [
      todoItem1,
      todoItem3
    ];
    service.add(todoItem1);
    service.add(todoItem2);
    service.add(todoItem3);
    service.remove(2);
    expect(service.all()).toEqual(expected);
  });

  it('should return the number of items if remove a non-existing todo from non-empty list', () => {
    const todoItem1: ITodo = {
      topic: 'New Item',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      topic: 'New Item',
      description: 'New Item Description'
    };
    const todoItem3: ITodo = {
      topic: 'New Item',
      description: 'New Item Description'
    };
    const expected = [
      todoItem1,
      todoItem2,
      todoItem3
    ];
    service.add(todoItem1);
    service.add(todoItem2);
    service.add(todoItem3);
    service.remove(3);
    expect(service.all()).toEqual(expected);
  });

  it('should return the number of items if remove a negative todo index from non-empty list', () => {
    const todoItem1: ITodo = {
      topic: 'New Item',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      topic: 'New Item',
      description: 'New Item Description'
    };
    const todoItem3: ITodo = {
      topic: 'New Item',
      description: 'New Item Description'
    };
    const expected = [
      todoItem1,
      todoItem2,
      todoItem3
    ];
    service.add(todoItem1);
    service.add(todoItem2);
    service.add(todoItem3);
    service.remove(-1);
    expect(service.all()).toEqual(expected);
  });

  it('should return todo item', () => {
    const todoItem1: ITodo = {
      topic: 'New Item 1',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      topic: 'New Item 2',
      description: 'New Item Description'
    };
    const todoItem3: ITodo = {
      topic: 'New Item 3',
      description: 'New Item Description'
    };
    service.add(todoItem1);
    service.add(todoItem2);
    service.add(todoItem3);
    const result = service.get(1);
    expect(result).toEqual(todoItem2);
  });

  it('should return null if get out-of-bound todo item', () => {
    const todoItem1: ITodo = {
      topic: 'New Item 1',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      topic: 'New Item 2',
      description: 'New Item Description'
    };
    const todoItem3: ITodo = {
      topic: 'New Item 3',
      description: 'New Item Description'
    };
    service.add(todoItem1);
    service.add(todoItem2);
    service.add(todoItem3);
    const result = service.get(3);
    expect(result).toBeNull();
  });

  it('should update to selected item', () => {
    const todoItem1: ITodo = {
      topic: 'New Item 1',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      topic: 'New Item 2',
      description: 'New Item Description'
    };
    const todoItem3: ITodo = {
      topic: 'New Item 3',
      description: 'New Item Description'
    };
    const todoNew: ITodo = {
      topic: 'New Updated Item',
      description: 'New Item Description'
    };
    const expected = [
      todoItem1,
      todoNew,
      todoItem3
    ];
    service.add(todoItem1);
    service.add(todoItem2);
    service.add(todoItem3);
    service.update(1, todoNew);
    const result = service.all()
    expect(result).toEqual(expected);
  });

  it('should not update to any item when index is out of bound', () => {
    const todoItem1: ITodo = {
      topic: 'New Item 1',
      description: 'New Item Description'
    };
    const todoItem2: ITodo = {
      topic: 'New Item 2',
      description: 'New Item Description'
    };
    const todoItem3: ITodo = {
      topic: 'New Item 3',
      description: 'New Item Description'
    };
    const todoNew: ITodo = {
      topic: 'New Updated Item',
      description: 'New Item Description'
    };
    const expected = [
      todoItem1,
      todoItem2,
      todoItem3
    ];
    service.add(todoItem1);
    service.add(todoItem2);
    service.add(todoItem3);
    service.update(3, todoNew);
    const result = service.all()
    expect(result).toEqual(expected);
  });
});
