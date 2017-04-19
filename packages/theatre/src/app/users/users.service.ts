import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserActions } from './users.actions';
import axios from 'axios';

@Injectable()
export class UsersService {
    constructor(
        private http: Http,
        private actions: UserActions) {}

    getAll() {
        axios.get('http://www.mocky.io/v2/58f614b4260000571c4ada6f')
        .then((data) => {
            this.actions.loadSucceeded(data.data);
        })
        .catch((error) => {
           this.actions.loadFailed(error);
        });
    }
}