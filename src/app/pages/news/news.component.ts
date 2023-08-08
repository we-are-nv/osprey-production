import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NewsService } from 'src/app/services/news.service';
import { NewsDialogComponent } from 'src/app/keyComponents/news-dialog/news-dialog.component';

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
	constructor(private newsService: NewsService, private dialog: MatDialog) {}

	articles: any[] = [];
	images: any[];
	datePublished: any;

	ngOnInit(): void {
		this.loadNews();
	}

	loadNews() {
		this.newsService.getNews().subscribe(data => {
			console.log(data);
			this.articles = data.articles.map((article: any) => ({
				...article,
				excerpt: this.createExcerpt(article.content),
				images: this.getImages(article),
				formatDate: this.readableDate(article.publish_date)
			}));
		});
	}

	createExcerpt(content: any): string {
		const wordCount = 24;
		const words = content.trim().split(' ');
		const excerptWords = words.slice(0, wordCount);

		return excerptWords.join(' ') + (words.length > wordCount ? '...see more' : '');
	}

	getImages(article: any): string[] {
		// Assuming the images field is an array of image URLs, return the images array
		return article.images || [];
	}

	readableDate(string: any) {
		const originalDate = new Date(string);
		const options: Intl.DateTimeFormatOptions = {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		};
		const formattedDate = originalDate.toLocaleDateString('en-US', options);
		return formattedDate;
	}

	convertDate(string: any) {
		const date = new Date(Number(string));
		let monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		console.log(date);
		const year = date.getFullYear();
		let month = date.getMonth();
		let dt = date.getDate();
		let dayTime;
		let stringMonth;
		let finshedDate;

		if (dt < 10) {
			(dayTime = '0' + dt).toString();
		}
		stringMonth = monthNames[month];
		finshedDate = `${dayTime} ${stringMonth}, ${year} `;
		console.log(finshedDate);
		return finshedDate;
	}

	openDialog(article: any) {
		this.dialog.open(NewsDialogComponent, {
			width: '80%',
			maxWidth: '100%',
			data: article,
			panelClass: 'fullscreen-dialog'
		});
	}
}
