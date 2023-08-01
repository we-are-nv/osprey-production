import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private API_URL = environment.API_URL
  constructor(private http: HttpClient) { }


  getNews() {
    return this.http.get<any>(this.API_URL+ '/news')
  }
}
