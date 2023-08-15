import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class NewMarketService {
	private API_URL = environment.API_URL;
	private markets = new Subject<any>();

	constructor(private http: HttpClient) {}

	getMarketsUpdateListener() {
		return this.markets.asObservable();
	}

	getMarkets(id: string): Observable<any[]> {
		return this.http.get<any[]>(`${this.API_URL}/markets`, {
			params: { parent: id }
		});
	}
}
