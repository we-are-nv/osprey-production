import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit{
  ngOnInit(){
    sessionStorage.setItem("navStyle", "standard")
  }
  @Input() mainTitle: string;
  @Input() secondaryTitle: string;
  @Input() upperTitle: string;
  @Input() lowerTitle: string;
  @Input() background: string;

  // button data
  @Input() isButtons: boolean;
  @Input() isButton3: boolean;

  @Input() button1Data: {text:string, path:string, type:string};
  @Input() button2Data: {text:string, path:string, type:string};
  @Input() button3Data: {text:string, path:string, type:string};

  // Styling
  @Input() centred: boolean;

}
