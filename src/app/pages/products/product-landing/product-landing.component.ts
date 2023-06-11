import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-landing',
  templateUrl: './product-landing.component.html',
  styleUrls: ['./product-landing.component.scss']
})
export class ProductLandingComponent implements OnInit {

  
  history: any = [{path:"/", friendly:"Home"}, {path:"/products/landing", friendly:"Products"}];

  categorySub :any;
  categories:any = [];
  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.productService.getCategories()
    this.categorySub = this.productService.getCategoriesUpdateListener()
      .subscribe((data)=>{
        this.categories = data.cats
    });

  }

}
