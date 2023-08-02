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
	image: any;
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
				formatDate: this.convertDate(article.date)
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

	convertDate(string: any) {
		const date = new Date(string).getTime();
		console.log(date);
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		let dt = date.getDate();
		let dayTime;
		let stringMonth;
		let finshedDate;

		if (dt < 10) {
			(dayTime = '0' + dt).toString();
		}
		if (month < 10) {
			(stringMonth = ' 0' + month).toString();
		}
		finshedDate = `${year} - ${stringMonth} - ${dayTime}`;
		console.log(finshedDate);
		return finshedDate;
	}

	// parseDate(date: any): any {
	// 	// Regular expression to check for ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
	// 	const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

	// 	// Regular expression to check for common date format (YYYY-MM-DD)
	// 	const commonDateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

	// 	if (!isoRegex.test(date) && !commonDateFormatRegex.test(date)) {
	// 		throw new Error('Invalid date format');
	// 	}

	// 	const isoDate = new Date(date);

	// 	if (isNaN(isoDate.getTime())) {
	// 		throw new Error('Invalid date format');
	// 	}

	// 	const options: Intl.DateTimeFormatOptions = {
	// 		day: 'numeric',
	// 		month: 'short',
	// 		year: 'numeric'
	// 	};
	// 	const formattedDate = isoDate.toLocaleDateString('en-US', options);
	// 	this.datePublished = formattedDate
	// 	return formattedDate;
	// }

	openDialog(article: any) {
		this.dialog.open(NewsDialogComponent, {
			width: '60%',
			data: article
		});
	}
}
