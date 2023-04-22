import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  @Input() mainTitle: string;
  @Input() upperTitle: string;
  @Input() lowerTitle: string;
  @Input() background: string;

  // button data
  @Input() isButtons: boolean;
  @Input() button1Data: {text:string, path:string};
  @Input() button2Data: {text:string, path:string};

  // Styling
  @Input() centred: boolean;
}
