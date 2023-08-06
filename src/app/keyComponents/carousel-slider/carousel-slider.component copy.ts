import {
	Component,
	OnInit,
	Input,
	ElementRef,
	ViewChild,
	OnChanges,
	SimpleChanges,
	ChangeDetectorRef,
	AfterViewInit,
	Renderer2
} from '@angular/core';
import {
	trigger,
	state,
	style,
	animate,
	transition,
	AnimationEvent,
	AnimationTriggerMetadata
} from '@angular/animations';
import { Slide } from 'src/app/interfaces/slide.interface';

// Adjust animate value as necessary but keep the same as the timeOut property value
const CarouselAnimationTrigger: AnimationTriggerMetadata = trigger(
	'carouselAnimation',
	[
		state('start', style({ transform: 'translateX(0%)' })),
		state('left', style({ transform: 'translateX(100%)' })),
		state('right', style({ transform: 'translateX(-100%)' })),
		transition(
			'start => left, left => start, left => right, right => left, start => right, right => start',
			animate('2000ms ease-out')
		)
	]
);

@Component({
	selector: 'app-carousel-slider',
	templateUrl: './carousel-slider.component.html',
	styleUrls: ['./carousel-slider.component.scss'],
	animations: [CarouselAnimationTrigger]
})
export class CarouselSliderComponent implements OnInit, OnChanges, AfterViewInit {
	@ViewChild('carouseltrack', { static: false })
	carouselTrackRef!: ElementRef<HTMLDivElement>;

	@Input() slides: Slide[] = [];
	visibleSlidesGroups: Slide[][] = [];
	currentVisibleGroupIndex = 0;

	// adjust timeout as necessary, but keep the same as the animate value
	timeOut: number = 2000;
	visibleSlides: Slide[] = [];
	hiddenSlides: Slide[] = [];
	bool: boolean = false;
	slideOffset = 0;
	containerTransitionState: 'start' | 'left' | 'right' = 'start';

	indexToUse: number = 0

	constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

	ngOnInit(): void {
		this.createVisibleSlidesGroups();
		this.updateVisibleSlides();
		this.indexToUse = 0;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['slides']) {
			if (this.slides) {
				this.createVisibleSlidesGroups();
				this.updateVisibleSlides();
			}
		}
	}
	ngAfterViewInit(): void {
		if (this.carouselTrackRef) {
			console.log(
				'Carousel track element reference:',
				this.carouselTrackRef.nativeElement
			);
		}
	}

	private createVisibleSlidesGroups(): void {
		this.visibleSlidesGroups = [];
		const groupCount = Math.ceil(this.slides.length / 4);
		for (let i = 0; i < groupCount; i++) {
			const startIndex = i * 4;
			const endIndex = startIndex + 4;
			const slidesGroup = this.slides.slice(startIndex, endIndex);
			this.visibleSlidesGroups.push(slidesGroup);
		}
	}

	private updateVisibleSlides(): void {
		this.visibleSlides = this.visibleSlidesGroups[this.currentVisibleGroupIndex];
	}

	onPrev(): void {
		this.indexToUse --;
		if (this.currentVisibleGroupIndex > 0) {
			this.containerTransitionState = 'right';
			this.currentVisibleGroupIndex--;
			this.slideOffset += 100;
			this.hiddenSlides = this.visibleSlidesGroups[this.currentVisibleGroupIndex];

			const newGroup = this.renderer.createElement('ng-container');
			this.renderer.addClass(newGroup, 'slide-group');
			this.hiddenSlides.forEach(slide => {
				const newSlide = this.slideCreation(slide);

				this.renderer.appendChild(newGroup, newSlide);
				console.log(newSlide);
			});
			console.log(newGroup);

			this.renderer.insertBefore(
				this.carouselTrackRef.nativeElement,
				newGroup,
				this.carouselTrackRef.nativeElement.firstChild
			);

			setTimeout(() => {
				this.updateVisibleSlides();
				this.renderer.removeChild(
					this.carouselTrackRef.nativeElement,
					this.carouselTrackRef.nativeElement.lastElementChild
				);
			}, this.timeOut);
		}
	}

	onNext(): void {
		this.indexToUse ++;
		if (this.currentVisibleGroupIndex < this.visibleSlidesGroups.length - 1) {
			this.containerTransitionState = 'left';
			this.currentVisibleGroupIndex++;
			this.slideOffset -= 100;
			this.hiddenSlides = this.visibleSlidesGroups[this.currentVisibleGroupIndex];

			const newGroup = this.renderer.createElement('ng-container');
			this.renderer.addClass(newGroup, 'slide-group');
			this.renderer.appendChild(this.carouselTrackRef.nativeElement, newGroup);

			this.hiddenSlides.forEach(slide => {
				const newSlide = this.slideCreation(slide);

				this.renderer.appendChild(newGroup, newSlide);
				console.log(newSlide);
			});
			console.log(newGroup);
			const existingSlideGroup =
				this.carouselTrackRef.nativeElement.querySelector('.slide-group');
			// this.renderer.insertBefore(
			// 	this.carouselTrackRef.nativeElement,
			// 	newGroup,
			// 	existingSlideGroup
			// );

			this.cdr.detectChanges();

			setTimeout(() => {
				this.updateVisibleSlides();
				this.renderer.removeChild(
					this.carouselTrackRef.nativeElement,
					this.carouselTrackRef.nativeElement.firstElementChild
				);
			}, this.timeOut);
		}
	}

	slideCreation = (slide: any): any => {
		const newSlide = this.renderer.createElement('div');
		this.renderer.addClass(newSlide, 'slide');
		const img = this.renderer.createElement('img');
		this.renderer.setAttribute(img, 'src', slide.thumbnail_image);
		this.renderer.setAttribute(img, 'alt', slide.name);
		const h3 = this.renderer.createElement('h3');
		const text = this.renderer.createText(slide.name);
		this.renderer.appendChild(h3, text);
		this.renderer.appendChild(newSlide, img);
		this.renderer.appendChild(newSlide, h3);
		return newSlide;
	};

	toggleBool(value: boolean): boolean {
		return !value;
	}
}
