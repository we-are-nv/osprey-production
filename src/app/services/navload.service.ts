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
		this.finalNav = {};
		await this.generateSingleInfo('about', 'About Us');
		await this.generateSiblingInfo('market', 'Markets');
		await this.generateSiblingInfo('service', 'Services');
		await this.generateSingleInfo('resource', 'Resources');
		await this.generateSingleInfo('contact', 'Contact');

		let categorySub = this.http
			.get<any>(this.API_URL + '/products/categories', { params: { parent: '' } })
			.subscribe(data => {
				let childLinks: any[] = [];
				data.cats.forEach((subPage: any) => {
					let childLink = {
						name: subPage.name,
						path: subPage.cat_url
					};
					childLinks.push(childLink);
				});
				let nav = {
					name: 'Products',
					headpath: '/products/top',
					childLinks: childLinks
				};
				console.log(nav);

				this.finalNav['product'] = nav;
				categorySub.unsubscribe();
			});
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

	generateSiblingInfo(type: string, name: string) {
		let tempSub = this.infoPageService
			.getThumbnails(type)
			.subscribe((data: any) => {
				let childLinks: any[] = [];
				data.forEach((page: any) => {
					let childLink = {
						name: page.name,
						path: '/info-page/' + type + '/' + page._id
					};
					childLinks.push(childLink);
				});

				let nav = {
					name: name,
					headpath: '/' + type + 's',
					childLinks: childLinks
				};
				console.log(nav);
				this.finalNav[type] = nav;

				tempSub.unsubscribe();
			});
	}
}
