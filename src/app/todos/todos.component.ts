import { Component } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent {
    todos: Todo[] = [];

    constructor( private todoService: TodoService ) {};

    log(content: string, $event: MouseEvent) {
        console.log(content, $event.currentTarget);
    };

    getTodos(): void {
        this.todoService.getPosts()
            .subscribe(todos => this.todos = todos)
    };

    ngOnInit() {
        this.getTodos();
    };
};
