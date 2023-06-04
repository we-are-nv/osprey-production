import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit{


  constructor(private _Activatedroute:ActivatedRoute, private productService: ProductService){}
  id:any;
  productSub: Subscription;
  similarProductsSub: Subscription;

  category = ""

  similarProducts:any;

  product: any = null;


  additionalInfo: any = []
  displayedColumns: string[] = ['detail', 'value'];


  ngOnInit() {
    this.additionalInfo = [];

    this._Activatedroute.params.subscribe(params => {

      // Reads parameters from URL

      this.id = params['id'];
      this.category = params['category'];



      // Get the product from the URL parameters

      this.productService.getSingleProduct(this.id, this.category)
      this.productSub = this.productService.getSingleProductUpdateListener()
      .subscribe((data)=>{
        this.product = data;
        console.log(this.product)
        let tempAdditionalInfo = this.product.additional_information.info
        this.informationConverter(tempAdditionalInfo)
        

        // Gets all the similar products

        this.productService.getProducts({category:this.category, page:1, limit:4});  
        this.similarProductsSub = this.productService.getProductsUpdateListener()
          .subscribe((data)=>{
            // console.log(data)
            this.similarProducts = data.products;
        });


    });
    });
  }

  // Converts additional information to readable format

  informationConverter(info:any){
    this.additionalInfo = []
    for (let k in info) {
      let v = info[k];
      let itemsArray= [];
      for(let item in v){

          if(this.specValidation(v[item])){
            let itemObj = {
              name:item,
              value:v[item].toString(),
            };

          itemsArray.push(itemObj);
        }
        
        
      }
      let infoObj = {
        name:k,
        items:itemsArray
      };
      if(itemsArray.length > 0){
        this.additionalInfo.push(infoObj);
      }
      
      console.log(this.additionalInfo);
    }
    
  }

  specValidation(data:any) : boolean{
    if (data !== '' && 
        data!== null && 
        data!== undefined &&
        data !== "n/a" &&
        data !== "na") {
          return true;
        }
      else{
        return false;
      }
  }


  checking(data:any){
    console.log(data)
  }
  
}
