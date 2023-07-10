import { Component, OnInit } from '@angular/core';
import { InfoPageService } from 'src/app/services/info-page.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	constructor(
		private productService: ProductService,
		private infoPageService: InfoPageService
	) {}
	// Category Stored Data
	categorySub: any;
	categories: any = [];

	productNav: any = [];
	finalNav: any = null;
	scrolled = false;
	navStyle = 'standard';

	ngOnInit() {
		// Get Product Categories

		// this.productService.getCategories("")
		// this.categorySub = this.productService.getCategoriesUpdateListener()
		//   .subscribe((data)=>{
		//     this.categories = data.cats
		//     let tempCategories:any[] = []

		//     // this.categories.forEach((category: any) => {
		//     //   // console.log('hello')
		//     //   // For each Category create a Nav diretorys
		//     //   tempCategories.push(
		//     //     {name:category.name, path:'products/'+category._id}
		//     //     )
		// Get Product Categories

		// this.productService.getCategories("")
		// this.categorySub = this.productService.getCategoriesUpdateListener()
		//   .subscribe((data)=>{
		//     this.categories = data.cats
		//     let tempCategories:any[] = []

		//     // this.categories.forEach((category: any) => {
		//     //   // console.log('hello')
		//     //   // For each Category create a Nav diretorys
		//     //   tempCategories.push(
		//     //     {name:category.name, path:'products/'+category._id}
		//     //     )

		//     });
		// this.productNav = tempCategories
		this.generateNav();
		// this.categorySub.unsubscribe()
	}

	// generateSingleInfo(type:string){
	//   this.infoPageService.getThumbnails(type).subscribe((data:any)=>{
	//     let id = data[0]._id;
	//     this.infoPageService.getMainPage(id)
	//     this.infoPageService.getMainUpdateListener().subscribe(data =>{
	//       let subPages = data.pages;
	//       console.log(subPages)
	//     })
	//   })

	// }

	async generateNav() {
		this.finalNav = {
			home: { path: '', name: 'Home' },
			dropDownMenus: [
				{
					name: 'Products',
					headpath: 'products/landing',
					childLinks: []
				}
			]
		};
		this.generateSingleInfo('about', 'About Us');
		this.generateSiblingInfo('market', 'Markets');
		this.generateSiblingInfo('service', 'Services');
		this.generateSingleInfo('recourse', 'Resources');

		this.generateSingleInfo('contact', 'Contact');
	}
	// On scroll detected, Set the toolbar class
	onWindowScroll(event: any) {
		if (window.pageYOffset > 20) {
			this.scrolled = true;
		} else {
			this.scrolled = true;
		}
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
					this.finalNav.dropDownMenus.push(nav);
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
				this.finalNav.dropDownMenus.push(nav);
				tempSub.unsubscribe();
			});
	}
}
