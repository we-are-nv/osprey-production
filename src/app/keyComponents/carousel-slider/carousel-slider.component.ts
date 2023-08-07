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
	Renderer2,
	HostListener
} from '@angular/core';
import {
	trigger,
	state,
	style,
	animate,
	transition,
	AnimationTriggerMetadata
} from '@angular/animations';
import { Slide } from 'src/app/interfaces/slide.interface';

const CarouselAnimationTrigger: AnimationTriggerMetadata = trigger(
	'carouselAnimation',
	[
		state('start', style({ transform: 'translateX(0%)' })),
		state('left', style({ transform: 'translateX(-100%)' })),
		state('right', style({ transform: 'translateX(100%)' })),
		transition('* => left, * => right', animate('2000ms ease-out'))
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
	nextVisibleGroupIndex = 0;
	prevHiddenSlides: Slide[] = [];

	timeOut: number = 2000;
	visibleSlides: Slide[] = [];
	hiddenSlides: Slide[] = [];
	slideOffset = 0;
	containerTransitionState: 'start' | 'left' | 'right' = 'start';

	constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

	ngOnInit(): void {
		this.createVisibleSlidesGroups();
		// this.updateVisibleSlides();
		this.nextVisibleGroupIndex = 0;
		this.nextVisibleGroupIndex = 1;
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

	private updateSlideOffset() {
		this.slideOffset = this.currentVisibleGroupIndex * -100;
	}

	private createVisibleSlidesGroups(): void {
		this.visibleSlidesGroups = [];
		const groupCount = Math.ceil(this.slides.length / 4);
		for (let i = 0; i < groupCount; i++) {
			const startIndex = i * 4;
			const endIndex = Math.min(startIndex + 4, this.slides.length);
			const slidesGroup = this.slides.slice(startIndex, endIndex);
			this.visibleSlidesGroups.push(slidesGroup);
		}
	}

	updateVisibleSlides(): void {
		this.visibleSlides = this.visibleSlidesGroups[this.currentVisibleGroupIndex];
		this.hiddenSlides =
			this.visibleSlidesGroups[this.currentVisibleGroupIndex + 1] || [];
		this.prevHiddenSlides =
			this.visibleSlidesGroups[this.currentVisibleGroupIndex - 1] || [];
	}

	onPrev(): void {
		if (this.currentVisibleGroupIndex > 0) {
			this.containerTransitionState = 'right';
			console.log('slideOffset before change: ', this.slideOffset);
			this.slideOffset += 100;
			console.log('slideOffset after change: ', this.slideOffset);

			this.nextVisibleGroupIndex--;

			setTimeout(() => {
				this.currentVisibleGroupIndex--;
				this.containerTransitionState = 'start';

				this.updateSlideOffset(); // Update the slideOffset after transitioning
			}, this.timeOut);
		}
	}

	onNext(): void {
		if (this.currentVisibleGroupIndex < this.visibleSlidesGroups.length - 1) {
			this.currentVisibleGroupIndex++;
			this.nextVisibleGroupIndex = this.currentVisibleGroupIndex + 1;
			this.slideOffset -= 100;

			setTimeout(() => {
				this.containerTransitionState = 'left';
				this.cdr.detectChanges();
				setTimeout(() => {
					// this.containerTransitionState = 'start';

					this.updateSlideOffset(); // Update the slideOffset after transitioning
					this.updateVisibleSlides();
					this.cdr.detectChanges();
				}, this.timeOut);
			}, 50);
		}
	}

	toggleBool(value: boolean): boolean {
		return !value;
	}
}
