import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories = [
    {name:"tada", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
    {name:"tada", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
    {name:"tada", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
    {name:"tada", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
  ]
}
