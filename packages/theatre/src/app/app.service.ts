import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {JsonActions} from "./json-populator/json-populator.actions";
import axios from "axios";
import {select} from "@angular-redux/store";


@Injectable()
export class AppService {
    constructor(private actions: JsonActions) {
    }


    getJson() {
        this.actions.loadJson();
        axios.get('http://localhost:3000/theatre.json')
            .then((data) => {
                this.actions.loadSucceeded(data.data);
            })
            .catch((e) => {
                this.actions.loadFailed(e);
            });
    }
}

