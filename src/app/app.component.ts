import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ToDos } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  count = 0;
  title = 'todo-app';
  todos = ToDos;
  categories = ['Personal', 'Others'];
  inputText = '';

  selectedCategory = 'Personal';

  storeToStorage() {
    window.localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  changeCategory() {
    if (this.selectedCategory === 'Personal') {
      this.selectedCategory = 'Others';
    } else {
      this.selectedCategory = 'Personal';
    }
  }

  handleTextChange(event: Event) {
    this.inputText = (event.target as HTMLInputElement).value;
  }

  addTodo() {
    this.todos.push({
      id: uuidv4(),
      title: this.inputText,
      isCompleted: false,
    });

    this.inputText = '';
    this.storeToStorage();
  }

  completeTodo(todoId: string) {
    const index = this.todos.findIndex(({ id }) => id === todoId);
    this.todos[index].isCompleted = true;
    this.storeToStorage();
  }

  unCompleteTodo(todoId: string) {
    const index = this.todos.findIndex(({ id }) => id === todoId);
    this.todos[index].isCompleted = false;
    this.storeToStorage();
  }

  deleteTodo(todoId: string) {
    this.todos = this.todos.filter(({id}) => todoId !== id);
    this.storeToStorage();
  }

  handleKeyDown(event: Event) {
    if ((event as KeyboardEvent).key === 'Enter') {
      this.addTodo();
    }
  }

  clearCompleted() {
    this.todos = this.todos.filter(({ isCompleted }) => !isCompleted);
    this.storeToStorage();
  }

}
