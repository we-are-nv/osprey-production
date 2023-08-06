import { Component, OnInit, Input } from '@angular/core';
import { InfoPageService } from 'src/app/services/info-page.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Slide } from 'src/app/interfaces/slide.interface';

@Component({
	selector: 'app-carousel-demo',
	templateUrl: './carousel-demo.component.html',
	styleUrls: ['./carousel-demo.component.scss']
})
export class CarouselDemoComponent implements OnInit {
	infoList: Slide[]=[];
	type = 'service';
	slides$: Observable<Slide[]>;
	slide: any;
	slides: Slide []

	constructor(private infoPageService: InfoPageService) {}

	ngOnInit(): void {
		this.slides$ = this.infoPageService.getThumbnails(this.type).pipe(
			map((data: any) => {
				this.infoList = data;
				console.log('data received: ', this.infoList);
				return data as Slide[];
			})
		);
		this.slides$.subscribe({
			next: data => {
				console.log('slides: ', data);
			},
			error: error => {
				console.error('Error reading data: ', error);
			}
		});
	}
}
