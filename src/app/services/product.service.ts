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

  private products = new Subject<{products:[any]}>
  constructor(private http: HttpClient) { }


  getProductsUpdateListener(){
    return this.products.asObservable();
  }


  getProducts(filter: any){
    const body = filter;
    this.http
      .get<any>(this.API_URL+ '/product/product_info?type=camera')
      .subscribe(response=>{
        console.log(response)
      })
  }

  categories = [
    {name:"marine", id:42},
    {name:"marine2", id:42},
  ]

}
