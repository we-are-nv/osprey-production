import {Injectable} from '@angular/core';
import {DatabaseService} from './database.service';
import {environment} from 'src/environments/environment';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {response} from 'express';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	private API_URL = environment.API_URL;

	//Category Stored Data
	private categories = new Subject<any>();

	// Product Stored Data
	private products = new Subject<any>(); //List of Products to be observed
	private singleProduct = new Subject<any>(); //Single Product

	constructor(private http: HttpClient, public router: Router) {}

	// Getting Lists Of Products
	getProductsUpdateListener() {
		return this.products.asObservable();
	}

	getProducts(filter: any) {
		// Filter contains Category and any other filters I need to apply
		const query = filter;
		this.http
			.get<any>(this.API_URL + '/products/product_info', {params: query})
			.subscribe(response => {
				this.products.next(response);
			});
	}

	// Search List of products based on filter, using the product_name
	searchProducts(filter: any) {
		const query = filter;
		this.http
			.get<any>(this.API_URL + '/products/search', {params: query})
			.subscribe(response => {
				this.products.next(response);
			});
	}
	async convertToId(name: String, code: String) {

	}


	// Category API connection
	getCategoriesUpdateListener() {
		return this.categories.asObservable();
	}

	getCategories(id: string) {
		this.http
			.get<any>(this.API_URL + '/products/categories', {params: {parent: id}})
			.subscribe({
				next: (response: any) => this.categories.next(response),
				error: error => this.router.navigate(['/error'])
			});
	}



	// Loading Single Product

	getSingleProductUpdateListener() {
		return this.singleProduct.asObservable();
	}

	getSingleProduct(id: string) {
		let query = id;
		let product: any;
		this.http
			.get<any>(this.API_URL + '/products/product_info', {
				params: {documentId: query, populate_include: 'all'}
			})
			.subscribe(response => {
				product = response.product;
				this.singleProduct.next(product);
			});
	}

	getSingleCategory(id: string) {
		
		return this.http.get<any>(this.API_URL + '/products/categories/single', {
			params: {id: id}
		});

	}
}

// Types Code
