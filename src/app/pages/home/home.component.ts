import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Example List of Services
  categorySub :any;
  productCategories:any = [];
  constructor(private productService: ProductService){}
  ngOnInit(): void {
    // this.location.replaceState("/some/newstate/");

    this.productService.getCategories()
    this.categorySub = this.productService.getCategoriesUpdateListener()
      .subscribe((data)=>{
        this.productCategories = data.cats
    });

  }
}
