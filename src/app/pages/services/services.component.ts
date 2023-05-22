import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
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
