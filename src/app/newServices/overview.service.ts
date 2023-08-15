import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
private API_URL = environment.API_URL
private overview= new Subject<any>()

  constructor(private http: HttpClient) { }

  getOverviewUpdateListener(){
    return this.overview.asObservable()
  }

  getOverview(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/overview`, {
      params: {parent: id}
    })
  }

  
}
