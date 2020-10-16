import { FormGroup } from '@angular/forms';
import { ITodo } from 'src/app/interfaces/ITodo';
import { TodoService } from 'src/app/services/todo.service';
import { TodoManageComponent } from './todo-manage.component';

describe('TodoManageComponent', () => {
  let component;
  const mockTodoService = {
    add: (): void => { },
    remove: (): void => { },
    get: (): ITodo => { return null; },
    update: () => { },
    all: (): ITodo[] => { return []; }
  };
  beforeEach(() => {
    component = new TodoManageComponent((mockTodoService as any) as TodoService);
  });

  it('should create todo form instance of FormGroup', () => {
    expect(component.todoForm instanceof FormGroup).toBe(true);
  });

  it('should create fields todo form with empty as default value', () => {
    expect(component.todoForm.controls.topic.value).toEqual('');
    expect(component.todoForm.get('topic').value).toEqual('');
    expect(component.todoForm.get('description').value).toEqual('');
  });

  it('should create default todo list', () => {
    spyOn(mockTodoService, 'all').and.returnValue([]);
    expect(component.todoList).toEqual([]);
    expect(mockTodoService.all).toHaveBeenCalledTimes(1);
  });

  describe('add', () => {
    it('should call todoService.add with form data', () => {
      spyOn(mockTodoService, 'add');
      component.todoForm.controls.topic.setValue('topic1');
      component.todoForm.controls.description.setValue('desc1');

      component.add();

      expect(mockTodoService.add).toHaveBeenCalledWith({ topic: 'topic1', description: 'desc1' });
    });

    it('should reset todo form', () => {
      spyOn(component, 'reset');

      component.add();
      expect(component.reset).toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    it('should clear value in form when added', () => {
      spyOn(component.todoForm, 'reset');
      component.todoForm.controls.topic.setValue('topic');
      component.todoForm.controls.description.setValue('desc1');

      component.reset();

      expect(component.todoForm.reset).toHaveBeenCalledTimes(1);
    });
  });

  describe('edit', () => {
    it('should get todo item for edit', () => {
      const mockTodo = { topic: 'Test', description: 'Test Description' };
      spyOn(mockTodoService, 'get').and.returnValue(mockTodo);

      component.edit(1);

      expect(component.todoForm.get('topic').value).toEqual(mockTodo.topic);
      expect(component.todoForm.get('description').value).toEqual(mockTodo.description);
    });

    it('should update todo item to selected item and reset form', () => {
      const selectedItem = 1;
      const mockTodo = { topic: 'Test', description: 'Test Description' };
      const expected = { topic: 'New topic', description: 'New description' };
      spyOn(mockTodoService, 'get').and.returnValue(mockTodo);
      spyOn(mockTodoService, 'update');
      spyOn(component.todoForm, 'reset');

      component.edit(selectedItem);
      component.todoForm.controls.topic.setValue(expected.topic);
      component.todoForm.controls.description.setValue(expected.description);
      component.update();

      expect(mockTodoService.update).toHaveBeenCalledWith(selectedItem, expected);
      expect(component.todoForm.reset).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should delete selected item and reset form', () => {
      const selectedItem = 0;
      spyOn(mockTodoService, 'remove');
      spyOn(component.todoForm, 'reset');

      component.remove(selectedItem);

      expect(mockTodoService.remove).toHaveBeenCalledWith(selectedItem);
      expect(component.todoForm.reset).toHaveBeenCalledTimes(1);
    });
  });

  describe('isAdd', () => {
    it('should return true if no editing item', () => {
      expect(component.isAdd).toBe(true);
    });

    it('should return false if no editing item', () => {
      const selectedItem = 1;
      const mockTodo = { topic: 'Test', description: 'Test Description' };
      spyOn(mockTodoService, 'get').and.returnValue(mockTodo);

      component.edit(selectedItem);

      expect(component.isAdd).toBe(false);
    });
  });
});
