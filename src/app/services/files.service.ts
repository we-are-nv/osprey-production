import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  
	private API_URL = environment.API_URL;

	
	private files = new Subject<any>;

	constructor(private http: HttpClient) {}

	getFiles(){
		this.http.get<any>(this.API_URL+ '/info/files').subscribe((data:any)=>{
		  this.files.next(data)
		})
	}
	getFilesObservable(){
		return this.files.asObservable()
	}
  
}
