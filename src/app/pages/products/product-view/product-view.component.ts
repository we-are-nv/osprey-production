import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
    private API_URL = environment.API_URL;
    constructor(
        private _Activatedroute: ActivatedRoute,
        private productService: ProductService,
        private http: HttpClient
    ) { }

    id: any;
    productSub: Subscription;
    similarProductsSub: Subscription;

    category = '';

    product: any = null;
    productVarients: any;

    history: any;

    additionalInfo: any = [];
    displayedColumns: string[] = ['detail', 'value'];

    async ngOnInit() {
        this.additionalInfo = [];

        this._Activatedroute.params.subscribe(async params => {
            // Reads parameters from URL


            let renderInfo: any = this._Activatedroute.snapshot.data;
            let renderType = renderInfo.type;
            if (renderType == 'friendly') {
                let paramsa = {code: 'BHOS2Z180I66M' };
                this.http
                    .get<any>(
                        this.API_URL + '/products/convert-route?code=' + params['code']
                    )
                    .subscribe(response => {
                        console.log(response);
                        this.id = response._id;
                        this.productSub = this.productService
                            .getSingleProductUpdateListener()
                            .subscribe(data => {
                                this.product = data;
                                console.log(this.product);

                                if (this.product.product_varients) this.productVarients = this.product.product_varients.data;

                                let tempAdditionalInfo = this.product.additional_information.info;
                                this.informationConverter(tempAdditionalInfo);

                                console.log();
                                // Gets all the similar products
                            });
                        this.productService.getSingleProduct(this.id);
                    });
				}


            // this.id = params['id'];
            // //this.category = params['category'];

            // // Get the product from the URL parameters

            // this.productSub = this.productService
            //     .getSingleProductUpdateListener()
            //     .subscribe(data => {
            //         this.product = data;
            //         console.log(this.product);

            //         if (this.product.product_varients)
            //             this.productVarients = this.product.product_varients.data;

	
            //         let tempAdditionalInfo = this.product.additional_information.info;
            //         this.informationConverter(tempAdditionalInfo);

            //         console.log();
            //         // Gets all the similar products
            //     });
            // this.productService.getSingleProduct(this.id);
        });
    }

	selectVarient(i: number) {}
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
}
