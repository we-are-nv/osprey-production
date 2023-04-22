import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  currentCatagory: string;

  products = [
    {name:"example Product",catagory:"SmokeAlarm" ,thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
    {name:"example Product",catagory:"SmokeAlarm" , thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
    {name:"example Product",catagory:"SmokeAlarmNot" , thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
    {name:"example Product",catagory:"SmokeAlarm", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
  ]
  changeCatagory(value:string){
    this.currentCatagory = value;
    console.log(this.currentCatagory)
  }
}
