import { Component } from '@angular/core';
import { InfoPageService } from 'src/app/services/info-page.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss']
})
export class MarketsComponent {
  marketsList: [any];
  type = "market"

  
  history: [{path:string, friendly:string}] = [{path:"/", friendly:"Markets"}];

  constructor(private infoPageService: InfoPageService){}
  ngOnInit(): void {
    this.infoPageService.getThumbnails(this.type).subscribe((data:any)=>{
      this.marketsList = data
    })

  }
}
