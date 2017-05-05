import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

	/**
	 * Cheap depluralizer, just removes an 's' if it is present at the
	 * end of the string
	 */
	depluralize(word: string) {
		return word.slice(-1) == 's' ? word.substring(0, word.length -1) : word;
	}

}
