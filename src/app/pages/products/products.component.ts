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
  category = "";
  currentPage:number;
  totalPages  :number;
  public productsSub : Subscription;

  history:any;
  
  

  ngOnInit(){
    this._Activatedroute.params.subscribe(params =>{
      this.category = params["category"]
      this.productService.getProducts({category:this.category, page:1}); 

      // Breadcrumb Setup
      this.history = [
        {path:"/", friendly:"Home"},
        {path:"/products/landing", friendly:"Products"}, 
        {path:("/products/"+this.category), friendly:this.category}
      ];
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
  




  changeType(value:any){
    this.category=value
    this.productService.getProducts({category:this.category, page:1});
  }
  loadProduct(id:any){
    this.router.navigate(['product/'+this.category+'/'+id]);

  }


  // On search
  onSearchChange(searchValue: any): void {  
    // console.log(searchValue.target.value);
    this.productService.searchProducts({
      page:1,
      searchQuery:searchValue.target.value,
      extra: true 
      });
  }
  changePage(newPage:any){
    this.productService.getProducts({category:this.category, page:newPage});  
    let top = document.getElementById('productList');
    top?.scrollIntoView()
  }
}


// 