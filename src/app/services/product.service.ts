import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private database: DatabaseService) { }
  products = [
    {id:"123", name:"example Product", catagory:42 ,thumbnail:"../../assets/images/ExampleProducts/cameras.png"},
    {id:"123", name:"example Product",catagory:42 , thumbnail:"../../assets/images/ExampleProducts/cameras.png"},
    {id:"123", name:"example Product",catagory:41 , thumbnail:"../../assets/images/ExampleProducts/cameras.png"},
    {id:"123", name:"example Product",catagory:43, thumbnail:"../../assets/images/ExampleProducts/cameras.png"},
  ]

  categories = [
    {name:"marine", id:42},
    {name:"marine2", id:42},
  ]

}
