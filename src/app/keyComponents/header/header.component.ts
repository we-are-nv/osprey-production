import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private productService: ProductService){}
  productTypes = this.productService.types;
  productTypeNav: any= [];
  finalNav: any;
  scrolled = false;
  navStyle= "standard"

    
  ngOnInit(): void {
    this.productTypes.forEach((type: any) => {
      this.productTypeNav.push(
        {name:type.name, path:'products/'+type.value}
        )
    });
    this.finalNav = {
      home:{path:"", name:"Home"},
      contact:{path:"", name:"Contact"},
      dropDownMenus:[
        {
          name:"About Us",
          headpath:"", 
          childLinks:[
            {name:"History", path:""}
          ]
        },
        {
          name:"Products",
          headpath:"products", 
          childLinks:this.productTypeNav
        },
        {
          name:"Markets",
          headpath:"", 
          childLinks:[
          {name:"example", path:""}
          ]
        },
        {
          name:"Services",
          headpath:"services", 
          childLinks:[
          {name:"categories", path:"services/categories"}
          ]
        },
        {
          name:"Recourses",
          headpath:"", 
          childLinks:[
          {name:"example", path:""}
          ]
        },  
      ]
      }
    console.log(this.finalNav)
    console.log(sessionStorage['navStyle'])
  }
  // On scroll detected, Set the toolbar class
  onWindowScroll(event:any){
    if(window.pageYOffset > 20){
      this.scrolled=true;
    }else{
      this.scrolled = false;
    }
  }
}
