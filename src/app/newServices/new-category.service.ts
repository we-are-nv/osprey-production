import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EnvironmentInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class NewCategoryService {
	private API_URL = environment.API_URL;
	private categories = new Subject<any>();

	constructor(private http: HttpClient) {}

  getCategoriesUpdateListener(){
    return this.categories.asObservable()
  }

	getCategories(id: string): Observable<any[]> {
		return this.http.get<any[]>(`${this.API_URL}/products/categories`, {
			params: { parent: id }
		});
	}
}
