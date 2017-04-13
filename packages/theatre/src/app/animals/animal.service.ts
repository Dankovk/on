import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ANIMAL_TYPES, AnimalType } from '../animals/animal.types';

// A fake API on the internets.
const URLS = {
	// local: '/api/animals/lions'
	[ANIMAL_TYPES.LION]: 'http://www.mocky.io/v2/58dfb6661000003b03cc15c8',
	// local: '/api/animals/elephants'
	[ANIMAL_TYPES.ELEPHANT]: 'http://www.mocky.io/v2/58dfb54c1000000403cc15c7',
};

@Injectable()
export class AnimalService {
	constructor(private http: Http) {}

	getAll(animalType: AnimalType) {
		return this.http.get(URLS[animalType])
			.map(resp => resp.json())
			.map(records => records.map(
				record => ({
					animalType,
					name: record.name,
				})));
	}
}
