import { Component } from '@angular/core';
import { ScrollService } from './services/scrollService/scroll.service';
import { ProductService } from './services/product.service';
import { InfoPageService } from './services/info-page.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ospreyProduction';

	constructor(
		private productService: ProductService,
		private infoPageService: InfoPageService,
		private scrollService: ScrollService
	) {}

	categories: any = [];
	categorySub: any;

	productNav: any = [];
	finalNav: any = null;

	ngOnInit() {
		this.generateNav();
	}

	async generateNav() {
		this.finalNav = {};
		this.generateSingleInfo('about', 'About Us');
		this.generateSiblingInfo('market', 'Markets');
		this.generateSiblingInfo('service', 'Services');
		this.generateSingleInfo('resource', 'Resources');

		this.generateSingleInfo('contact', 'Contact');
		this.categorySub = this.productService.getAllCategories().subscribe(data => {
			console.log(data);
			let childLinks: any[] = [];
			data.cats.forEach((subPage: any) => {
				let childLink = {
					name: subPage.name,
					path: '/search/' + subPage._id
				};
				childLinks.push(childLink);
			});
			let nav = {
				name: 'Products',
				headpath: '/products/landing',
				childLinks: childLinks
			};
			console.log(nav);

			this.finalNav['product'] = nav;
			this.categorySub.unsubscribe();
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
					console.log(nav);

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

				console.log(this.finalNav);

				tempSub.unsubscribe();
			});
	}
}
