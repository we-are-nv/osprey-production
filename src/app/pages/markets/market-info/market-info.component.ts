import { Component } from '@angular/core';

@Component({
  selector: 'app-market-info',
  templateUrl: './market-info.component.html',
  styleUrls: ['./market-info.component.scss']
})
export class MarketInfoComponent {
  
  history: any = [{path:"/markets", friendly:"Markets"}, {path:"/markets/marine", friendly:"Marine"}];
}
