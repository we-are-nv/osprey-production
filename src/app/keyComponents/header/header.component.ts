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
    this.productService.getCategories("")






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
       
        this.generateSingleInfo("about", "About Us"),
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
        this.generateSingleInfo("recourse", "Recourses")
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

  generateSingleInfo(type: string, name:string): any{
    this.infoPageService.getThumbnails(type).subscribe((data:any)=>{
      let page = data[0]
      let childLinks: any[]= []

      page.pages.forEach((subPage: any) => {
        let childLink = {name:subPage.name, path:subPage.id}
        childLinks.push(childLink)
      });

      let nav = {
        name: name,
        headpath: "/info-page/"+type+"/"+page._id,
        childLinks:childLinks
      }

      return nav
    })
  }

}
