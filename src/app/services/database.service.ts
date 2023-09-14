import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	private API_URL = environment.API_URL;
	constructor(private http: HttpClient) {}

	searchAll(query: any) {
		return this.http.get<any>(this.API_URL + '/search/all', {
			params: { searchQuery: query }
		});
	}


	getCredits(type:any){
		return this.http.get<any>(this.API_URL+ '/info/accreditations', {params: {page: 1, type:type}});
	}

}
