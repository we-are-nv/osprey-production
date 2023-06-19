import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-bonus-card',
  templateUrl: './bonus-card.component.html',
  styleUrls: ['./bonus-card.component.scss']
})
export class BonusCardComponent implements OnInit{
  @Input() card: any;
  ngOnInit(){
    console.log(this.card)
  }
  
}