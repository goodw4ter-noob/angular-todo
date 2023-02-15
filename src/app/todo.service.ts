import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Todo } from './models/todo';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private url = 'http://localhost:3000/posts';

    constructor( private http: HttpClient ) {}

    getPosts(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.url)
    };
}
