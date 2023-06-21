import { Component, OnInit } from '@angular/core';
import { InfoPageService } from 'src/app/services/info-page.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private productService: ProductService, private infoPageService: InfoPageService){}
  // Category Stored Data
  categorySub: any;
  categories: any = [];

  productNav: any= [];
  finalNav: any = null;
  scrolled = false;
  navStyle= "standard"


  async ngOnInit() {
    // Get Product Categories
    this.productService.getCategories()
    this.categorySub = this.productService.getCategoriesUpdateListener()
      .subscribe((data)=>{
        this.categories = data.cats
        let tempCategories:any[] = []
        this.categories.forEach((category: any) => {
          // console.log('hello')
          // For each Category create a Nav diretorys
          tempCategories.push(
            {name:category.name, path:'products/'+category._id}
            )

        });
        this.productNav = tempCategories
        // console.log(this.productNav)
        // this.generateSingleInfo("market")
        this.generateNav()
    });






  }
  // generateSingleInfo(type:string){
  //   this.infoPageService.getThumbnails(type).subscribe((data:any)=>{
  //     let id = data[0]._id;
  //     this.infoPageService.getMainPage(id)
  //     this.infoPageService.getMainUpdateListener().subscribe(data =>{
  //       let subPages = data.pages;
  //       console.log(subPages)
  //     })
  //   })
    
  // }

  async generateNav(){
    this.finalNav = {
      home:{path:"", name:"Home"},
      contact:{path:"contact", name:"Contact"},
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
          childLinks:  this.productNav
        },
        {
          name:"Markets",
          headpath:"markets",
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
          name:"Resourses",
          headpath:"/info-page/recourse/lense field of View",
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

}
