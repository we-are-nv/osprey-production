import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { IconRegisterService } from 'src/app/services/icon-register.service';


@Component({
	selector: 'app-quote-form',
	templateUrl: './quote-form.component.html',
	styleUrls: ['./quote-form.component.scss']
})
export class QuoteFormComponent {
	message;
	constructor(
		private fb: FormBuilder,
		private mailService: ContactService,
		private iconRegistry: IconRegisterService
	) {
		this;
		this.message = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.required],
			phoneNumber: [''],
			organisation: ['', Validators.required],
			location: [''],
			subject: [''],
			message: ['']
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
