import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {
  private API_URL = environment.API_URL
  private products = new Subject<any>()
  private singleProduct = new Subject<any>()

  constructor(private http: HttpClient) { }

  getProductsUpdateListener(){
    return this.products.asObservable()
  }

  getProducts(filter: any){

  }

  getSingleProductUpdateListener(){
    return this.singleProduct.asObservable()
    
  }
}
