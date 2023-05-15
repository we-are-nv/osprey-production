import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private productService: ProductService, private router:Router, private _Activatedroute: ActivatedRoute){}
  products: any;

  types: any[];
  type = "";
  currentPage:number;
  totalPages  :number;
  public productsSub : Subscription;

  ngOnInit(){
    this.types = this.productService.types
    this._Activatedroute.params.subscribe(params =>{
      
      this.type = params['type'];
      this.productService.getProducts({type:this.type, page:1}); 
    }) 
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




  changeType(value:any){
    this.type=value
    this.productService.getProducts({type:this.type, page:1});
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