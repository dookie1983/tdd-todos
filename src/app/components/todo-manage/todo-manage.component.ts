import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ITodo } from 'src/app/interfaces/ITodo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.scss']
})
export class TodoManageComponent implements OnInit {
  private readonly NO_ITEM_SELECTED = -1;
  public todoForm: FormGroup = new FormGroup({
    topic: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  private selectedTodoItem: number;

  constructor(private todoService: TodoService) {
    this.selectedTodoItem = this.NO_ITEM_SELECTED;
  }

  public ngOnInit(): void {
  }

  public get todoList(): ITodo[] {
    return this.todoService.all();
  }

  public get isAdd(): boolean {
    return this.selectedTodoItem === this.NO_ITEM_SELECTED;
  }

  public add(): void {
    console.log('test');
    console.log(this.todoService.all())
    this.todoService.add(this.todoForm.getRawValue());
    console.log(this.todoService.all())
    this.reset();
  }

  public edit(index: number): void {
    this.selectedTodoItem = index;
    this.todoForm.setValue(this.todoService.get(index));
  }

  public update(): void {
    this.todoService.update(this.selectedTodoItem, this.todoForm.getRawValue());
    this.reset();
  }

  public remove(index: number): void {
    this.todoService.remove(index);
    this.reset();
  }

  reset() {
    this.todoForm.reset();
    this.selectedTodoItem = this.NO_ITEM_SELECTED;
  }

}
