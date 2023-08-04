import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root'
})
export class IconRegisterService {
	constructor(
		private matIconRegistry: MatIconRegistry,
		private domSanitizer: DomSanitizer
	) {
		this.matIconRegistry.addSvgIcon(
			`whatsapp-colour`,
			this.domSanitizer.bypassSecurityTrustResourceUrl(
				'../../assets/images/customIcons/whatsapp-color-icon.svg'
			)
		);
		this.matIconRegistry.addSvgIcon(
			`fb-messenger`,
			this.domSanitizer.bypassSecurityTrustResourceUrl(
				'../../assets/images/customIcons/facebook-messenger-icon.svg'
			)
		);
	}
}
