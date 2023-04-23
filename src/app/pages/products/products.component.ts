import { Component } from '@angular/core';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  currentCatagory=null;

  products = [
    {name:"example Product", catagory:"SmokeAlarm" ,thumbnail:"../../assets/images/ExampleProducts/cameras.png"},
    {name:"example Product",catagory:"SmokeAlarm" , thumbnail:"../../assets/images/ExampleProducts/cameras.png"},
    {name:"example Product",catagory:"SmokeAlarmNot" , thumbnail:"../../assets/images/ExampleProducts/cameras.png"},
    {name:"example Product",catagory:"SmokeAlarm", thumbnail:"../../assets/images/ExampleProducts/cameras.png"},
  ]
  changeCatagory(value:any){
    this.currentCatagory = value;
    console.log(this.currentCatagory)
  }
  filterCheck(value:any){
    
  }
}
