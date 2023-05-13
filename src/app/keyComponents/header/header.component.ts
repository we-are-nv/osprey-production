import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  scrolled = false;
  navStyle= "standard"
  finalNav = {
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
        childLinks:[
        {name:"example", path:""}
        ]
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
    
  ngOnInit(): void {
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
