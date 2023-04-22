import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products = [
    {name:"example Product", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
    {name:"example Product", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
    {name:"example Product", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
    {name:"example Product", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
  ]
}
