import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Example List of Services
  serviceList = [
    {image:"https://features.boats.com/boat-content/files/2022/12/2023-Pearl-72-Yacht.jpeg?w=450&h=450", name:"Marine", id:"hello"},
    {image:"https://features.boats.com/boat-content/files/2022/12/2023-Pearl-72-Yacht.jpeg?w=450&h=450", name:"Marine", id:"hello"},
    {image:"https://features.boats.com/boat-content/files/2022/12/2023-Pearl-72-Yacht.jpeg?w=450&h=450", name:"Marine", id:"hello"},
    {image:"https://features.boats.com/boat-content/files/2022/12/2023-Pearl-72-Yacht.jpeg?w=450&h=450", name:"Marine", id:"hello"},
  ]
}
