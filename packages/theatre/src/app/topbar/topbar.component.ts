import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from "@angular-redux/store";
import { JsonActions } from '../json-populator/json-populator.actions';


@Component({
    selector: 'topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
    constructor(private actions: JsonActions){}

    private currentStateJson: any;
    private isDemoExist: any;

    @select(['json', 'componentType']) readonly componentType: Observable<string>;
    @select(state => state.json.data[state.json.componentType].atoms) readonly atoms: Observable<any[]>;
    @select(state => state.json.data[state.json.componentType].molecules) readonly molecules: Observable<any[]>;
    @select(state => state.json.data[state.json.componentType].organisms) readonly organisms: Observable<any[]>;
    @select(state => state.json.data[state.json.componentType].templates) readonly templates: Observable<any[]>;
    @select(state => state.json.data[state.json.componentType].pages) readonly pages: Observable<any[]>;

    @select(state => state.json) stateJson: Observable<any>;

    ngOnInit() {


        this.stateJson.subscribe((data) => {
            this.currentStateJson = data;
        });

        this.componentType.subscribe((selectedComponentType) => {

            let stateJson = this.currentStateJson,
                currentDemo = stateJson.selectedComponent.demo,
                currentPattern = stateJson.selectedComponent.pattern,
                currentName = stateJson.selectedComponent.name;

            this.isDemoExist = () => {
                let exist = false;
                if(currentDemo){
                    stateJson.data[selectedComponentType][currentPattern].forEach((elem) => {
                        if(elem.name = currentName){
                            elem.demos.forEach((elem) => {
                                console.log(elem, currentDemo);
                                if(elem === currentDemo){
                                    exist = true;
                                }
                            });
                        }
                    });
                }

                return exist;
            };


            if(this.isDemoExist()){
                this.actions.changeUrlAccordingToDemo(currentPattern, currentName, 'demo', currentDemo, selectedComponentType);
            }
            else {
                currentPattern ? this.actions.selectComponent(currentPattern, currentName) : false;
                this.actions.changeUrlAccordingToType(selectedComponentType);
            }

        });

    }

    changeComponentType(componentType) {
        this.actions.selectType(componentType);
    }
}
