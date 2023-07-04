import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ContactService {
	private API_URL = environment.API_URL;
	constructor(private http: HttpClient) {}

	sendMessage(form: any) {
		this.http.post(this.API_URL + '/mail', form).subscribe((data: any) => {
			console.log(data);
		});
	}
}
