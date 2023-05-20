import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private productService: ProductService){}
  // Category Stored Data
  categorySub: any;
  categories: any = [];

  categoryTypeNav: any= [];
  finalNav: any;
  scrolled = false;
  navStyle= "standard"

    
  async ngOnInit() {
    // Get Product Categories
    this.productService.getCategories()
    this.categorySub = this.productService.getCategoriesUpdateListener()
      .subscribe((data)=>{
        this.categories = data.cats
    });

    this.generateNav()
    
    

    
  }

  async generateNav(){
    this.setUpProductNav()

    
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
          headpath:"products/landing", 
          childLinks:  this.categoryTypeNav
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
  }
  // On scroll detected, Set the toolbar class
  onWindowScroll(event:any){
    if(window.pageYOffset > 20){
      this.scrolled=true;
    }else{
      this.scrolled = true;
    }
  }
  
  
  async setUpProductNav(){
    this.categories.forEach((category: any) => {
      console.log('hello')
      // For each Category create a Nav diretorys
      this.categoryTypeNav.push(
        {name:category.name, path:'products/'+category.id}
        )
    });
  }
}
