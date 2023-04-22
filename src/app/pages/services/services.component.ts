import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services = [
    {name:"tada", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
    {name:"tada", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
    {name:"tada", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
    {name:"tada", thumbnail:"https://www.asafetyp.co.uk/wp-content/uploads/2020/06/image-28.png"},
  ]
}
