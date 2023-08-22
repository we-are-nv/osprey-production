import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductService } from './product.service';
import { InfoPageService } from './info-page.service';
import { ScrollService } from './scrollService/scroll.service';

@Injectable({
	providedIn: 'root'
})
export class NavloadService {
	private API_URL = environment.API_URL;
	constructor(private http: HttpClient, private infoPageService: InfoPageService) {}

	finalNav: any = {};
	async generateNav() {
		this.finalNav = {
			market:{
				headpath:"/markets",
				name: "Markets"
			},
			service:{
				headpath:"/services",
				name:"Services"
			},
			product:{
				headpath:"/products/top",
				name:"Products"
			},

		};
		await this.generateSingleInfo('about', 'About Us');
		await this.generateSingleInfo('resource', 'Resources');
		await this.generateSingleInfo('contact', 'Contact');
	}

	generateSingleInfo(type: string, name: string) {
		let tempSub = this.infoPageService
			.getThumbnails(type)
			.subscribe((data: any) => {
				let pageId = data[0]._id;
				this.infoPageService.navGetPage(pageId).subscribe((data: any) => {
					let childLinks: any[] = [];

					data.pages.forEach((subPage: any) => {
						let childLink = {
							name: subPage.name,
							path: '/info-page/' + type + '/' + pageId + '/' + subPage.id
						};
						childLinks.push(childLink);
					});

					let nav = {
						name: name,
						headpath: '/info-page/' + type + '/' + pageId,
						childLinks: childLinks
					};

					this.finalNav[type] = nav;
					tempSub.unsubscribe();
				});
			});
	}

}
