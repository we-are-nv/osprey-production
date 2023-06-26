import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-landing',
  templateUrl: './product-landing.component.html',
  styleUrls: ['./product-landing.component.scss']
})
export class ProductLandingComponent implements OnInit {

  
  history: any = [{path:"/", friendly:"Home"}, {path:"/products/landing", friendly:"Products"}];

  activeId = '';

  categorySub :any;
  categories:any = [];
  constructor(private productService: ProductService, private router: Router){}
  ngOnInit(): void {
    this.productService.getCategories("")
    this.categorySub = this.productService.getCategoriesUpdateListener()
      .subscribe((data)=>{
        console.log(data)
        this.categories = data.cats
        console.log(this.categories)
        if(this.categories.length < 1 ) {
          this.loadProds()
        } 
    });
  }
  getNewCats(id: any){
    this.productService.getCategories(id);
    console.log(this.categories)
    this.activeId = id;
  }
  loadProds(){
    this.categorySub.unsubscribe();
    this.router.navigate(['/search/'+ this.activeId])
  }
}
