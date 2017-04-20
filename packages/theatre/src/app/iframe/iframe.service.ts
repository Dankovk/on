import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IframeActions } from './iframe.actions';
import axios from 'axios';

@Injectable()
export class IframeService {
    constructor(
        private http: Http,
        private actions: IframeActions) {}

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