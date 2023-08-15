import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class NewServiceService {
	private API_URL = environment.API_URL;
	private services = new Subject<any>();
	constructor(private http: HttpClient) {}

  getServicesUpdateListener(){
    return this.services.asObservable()
  }

  getServices(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/services`, {
      params: {parent: id}
    })
  }
}
