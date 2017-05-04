import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {JsonActions} from "./json-populator/json-populator.actions";
import { IframeService } from './iframe/iframe-page.service';
import axios from "axios";
import {select} from "@angular-redux/store";


@Injectable()
export class AppService {
    private snapshot: Object;
    @select(['json', 'loading']) readonly loading: Observable<boolean>;

    constructor(private actions: JsonActions, private service: IframeService) {}

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

