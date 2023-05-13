import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = environment.API_URL;

  private products = new Subject<any>
  private singleProduct = new Subject<any>

  constructor(private http: HttpClient) { }


  // Getting Lists Of Products
  getProductsUpdateListener(){
    return this.products.asObservable();
  }


  getProducts(filter: any){
    const query = filter;
    console.log(query)
    this.http
      .get<any>(this.API_URL+ '/product/product_info', {params: query})
      .subscribe(response=>{
        this.products.next(response)
      })
  }
  searchProducts(filter: any){
    const query = filter;
    console.log(query)
    this.http
      .get<any>(this.API_URL+ '/product/search', {params: query})
      .subscribe(response=>{
        this.products.next(response)
      })
  }


  // Loading Single Product

  getSingleProductUpdateListener(){
    return this.singleProduct.asObservable();
  }

  getSingleProduct(id: string){
    console.log(id)
    let query = id
    let product: any;
    this.http
      .get<any>(this.API_URL+ '/product/product_info', {params: {documentId: query, populate_exclude:""}})
      .subscribe(response=>{
        product = response.product
        this.singleProduct.next(product)
      })
  }

  categories = [
    {name:"marine", id:42},
    {name:"marine2", id:42},
  ]

}
