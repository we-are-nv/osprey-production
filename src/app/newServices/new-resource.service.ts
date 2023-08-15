import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewResourceService {
  private API_URL = environment.API_URL
  private resources = new Subject<any>()
  constructor(private http: HttpClient) { }

}
