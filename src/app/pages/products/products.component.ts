import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  constructor(private productService: ProductService){}

  currentCategory=null;

  products = this.productService.products;
  categories = this.productService.categories;

  changeCategory(value:any){
    this.currentCategory = value;
    console.log(this.currentCategory)
  }
  filterCheck(value:any){

  }
}


// 