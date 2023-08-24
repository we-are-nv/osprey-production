import { Component } from '@angular/core';
import { InfoPageService } from 'src/app/services/info-page.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  serviceList: [any];
  type ="service";

  
  history: [{path:string, friendly:string}] = [{path:"/services", friendly:"Services"}];

  constructor(private infoPageService: InfoPageService){}
  ngOnInit(): void {
    this.infoPageService.getThumbnails(this.type, false).subscribe((data:any)=>{
      this.serviceList = data
    })

  }
}
