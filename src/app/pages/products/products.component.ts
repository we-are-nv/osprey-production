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
  currentPage:number;
  totalPages  :number;
  public productsSub : Subscription;

  ngOnInit(){
    this.productService.getProducts({type:"camera", page:1});  
    this.productsSub = this.productService.getProductsUpdateListener()
      .subscribe((data)=>{
        console.log(data)
        this.products = data.products;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages

    });
  }

  currentCategory=null;
  
  categories = this.productService.categories;




  changeCategory(value:any){
    this.currentCategory = value;
    console.log(this.currentCategory)
  }
  loadProduct(id:any){
    this.router.navigate(['product/'+id]);

  }


  // On search
  onSearchChange(searchValue: any): void {  
    console.log(searchValue.target.value);
    this.productService.searchProducts({
      page:1,
      searchQuery:searchValue.target.value,
      extra: true 
      });
  }
  changePage(changeType:any){
    if(changeType== "-"){
      this.currentPage -= 1
    }else if (changeType == "+"){
      this.currentPage += 1
    }
    this.productService.getProducts({type:"camera", page:this.currentPage});  
  }
}


// 