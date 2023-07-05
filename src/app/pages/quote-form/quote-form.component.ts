import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
	selector: 'app-quote-form',
	templateUrl: './quote-form.component.html',
	styleUrls: ['./quote-form.component.scss']
})
export class QuoteFormComponent {
	message;
	constructor(private fb: FormBuilder, private mailService: ContactService) {
		this.message = this.fb.group({
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			email: ['', Validators.required],
			phone_number: ['', Validators.required],
			organisation: ['', Validators.required],
			location: ['', Validators.required],
			message: [''],
			creation_time: new Date().getTime()
		});
	}
	get f() {
		return this.message.controls;
	}
	submitForm() {
		if (!this.message.valid) this.message.markAllAsTouched;
		if (this.message.valid) {
			this.mailService.sendMessage(this.message.value);
			this.message.reset();
		}
	}
}
