import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = environment.API_URL;

  //Category Stored Data
  private categories = new Subject<any>;

  // Product Stored Data
  private products = new Subject<any>; //List of Products to be observed
  private singleProduct = new Subject<any>; //Single Product



  constructor(private http: HttpClient) { }


  // Getting Lists Of Products
  getProductsUpdateListener(){
    return this.products.asObservable();
  }


  getProducts(filter: any){
    // Filter contains Category and any other filters I need to apply
    const query = filter;
    // console.log(query)
    this.http
      .get<any>(this.API_URL+ '/service/product_info', {params: query})
      .subscribe(response=>{
        this.products.next(response)
      })
  }
  // Search List of products based on filter, using the product_name
  searchProducts(filter: any){
    const query = filter;
    // console.log(query)
    this.http
      .get<any>(this.API_URL+ '/service/search', {params: query})
      .subscribe(response=>{
        this.products.next(response)
      })
  }

  // Category API connection
  getCategoriesUpdateListener(){
    return this.categories.asObservable();
  }

  getCategories(){
    this.http
      .get<any>(this.API_URL+ '/service/categories')
      .subscribe(response=>{
        // console.log(response)
        this.categories.next(response)
      })
  }


  // Loading Single Product

  getSingleProductUpdateListener(){
    return this.singleProduct.asObservable();
  }

  getSingleProduct(id: string, type:string){
    // console.log(id)
    let query = id
    let product: any;
    this.http
      .get<any>(this.API_URL+ '/service/product_info', {params: {documentId: query, type:type, populate_include:"all"}})
      .subscribe(response=>{
        product = response.product
        this.singleProduct.next(product)
      })
  }

  // categories = [
  //   {name:"marine", id:42},
  //   {name:"marine2", id:42},
  // ]
  types= [

    {name: "Cameras", value:"camera"},
    {name: "Ethernet", value:"ethernet"},
    {name: "Housing", value:"housing"},
    {name: "Accessories", value:"accessory"},
    {name: "Disks", value: "disk_nvr"},
    {name: "NVR", value: "nvr"}
  ]

}

// Types Code
