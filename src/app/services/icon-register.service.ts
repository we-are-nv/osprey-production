import { Injectable, OnInit, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { platform } from 'os';

@Injectable({
	providedIn: 'root'
})
export class IconRegisterService implements OnInit {
	constructor(
		private _matIconRegistry: MatIconRegistry,
		private _domSanitizer: DomSanitizer,
		@Inject(PLATFORM_ID) private platformId: string
	) {
		const svgUrlBase = 'assets/images/socialMedias/';
		const domain = isPlatformServer(platformId) ? 'https://localhost:4000/' : '';

		this._matIconRegistry.addSvgIcon(
			`whatsapp-colour`,
			// `../../assets/images/socialMedias/whatsapp-color-icon.svg`
			this._domSanitizer.bypassSecurityTrustResourceUrl(
				domain + svgUrlBase + 'whatsapp-color-icon.svg'
			)
		);

		this._matIconRegistry.addSvgIcon(
			`fb-messenger`,
			// `../../assets/images/socialMedias/facebook-messenger-icon.svg`
			this._domSanitizer.bypassSecurityTrustResourceUrl(
				domain + svgUrlBase + 'facebook-messenger-icon.svg'
			)
		);
	}
	ngOnInit(): void {}
}
