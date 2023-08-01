import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-product-view',
	templateUrl: './product-view.component.html',
	styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
	constructor(
		private _Activatedroute: ActivatedRoute,
		private productService: ProductService
	) {}
	id: any;
	productSub: Subscription;
	similarProductsSub: Subscription;

	category = '';

	product: any = null;
	productVarients: any;

	history: any;

	additionalInfo: any = [];
	displayedColumns: string[] = ['detail', 'value'];

	ngOnInit() {
		this.additionalInfo = [];

		this._Activatedroute.params.subscribe(params => {
			// Reads parameters from URL

			this.id = params['id'];
			//this.category = params['category'];

			// Get the product from the URL parameters

			this.productSub = this.productService
				.getSingleProductUpdateListener()
				.subscribe(data => {
					this.product = data;
					console.log(this.product);

					this.history = [
						{ path: '/', friendly: 'Home' },
						{ path: '/products/top', friendly: 'Products' },
						// {path:"/products/"+this.product.category, friendly:this.product.category},
						{
							path: '/product/' + this.product.category + '/' + this.product._id,
							friendly: this.product.product_name
						}
					];

					if (this.product.product_varients)
						this.productVarients = this.product.product_varients.data;

					let tempAdditionalInfo = this.product.additional_information.info;
					this.informationConverter(tempAdditionalInfo);

					console.log();
					// Gets all the similar products
				});
			this.productService.getSingleProduct(this.id);
		});
	}

	// Converts additional information to readable format

	informationConverter(info: any) {
		this.additionalInfo = [];
		for (let k in info) {
			let v = info[k];
			for (let item in v) {
				if (this.specValidation(v[item])) {
					let itemObj = {
						name: item,
						value: v[item].toString()
					};

					this.additionalInfo.push(itemObj);
				}
			}
		}
	}

	specValidation(data: any): boolean {
		if (
			data !== '' &&
			data !== null &&
			data !== undefined &&
			data !== 'n/a' &&
			data !== 'na'
		) {
			return true;
		} else {
			return false;
		}
	}

	checking(data: any) {
		console.log(data);
	}

	selectVarient(i: number) {}
}
