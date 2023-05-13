import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private productService: ProductService, private router:Router){}

  products: any;
  public productsSub : Subscription;

  ngOnInit(){
    this.productService.getProducts({type:"camera"});  
    this.productsSub = this.productService.getProductsUpdateListener()
      .subscribe((data)=>{
        console.log(data)
        this.products = data;
    });
  }

  currentCategory=null;
  
  categories = this.productService.categories;




  changeCategory(value:any){
    this.currentCategory = value;
    console.log(this.currentCategory)
  }
  filterCheck(value:any){

  }
  loadProduct(id:any){
    this.router.navigate(['product/'+id]);

  }
}


// 