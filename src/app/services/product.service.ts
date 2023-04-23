import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor() { }
  products = [
    {name:"example Product", catagory:42 ,thumbnail:"../../assets/images/ExampleProducts/cameras.png"},
    {name:"example Product",catagory:42 , thumbnail:"../../assets/images/ExampleProducts/cameras.png"},
    {name:"example Product",catagory:41 , thumbnail:"../../assets/images/ExampleProducts/cameras.png"},
    {name:"example Product",catagory:43, thumbnail:"../../assets/images/ExampleProducts/cameras.png"},
  ]

  categories = [
    {name:"marine", id:42},
    {name:"marine2", id:42},
  ]

}
