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

	ngOnInit(): void {
		this.loadNews();
	}

	loadNews() {
		this.newsService.getNews().subscribe(data => {
			console.log(data);
			this.articles = data.articles.map((article: any) => ({
				...article,
				excerpt: this.createExcerpt(article.content)
			}));
		});
	}

	createExcerpt(content: any): string {
		const wordCount = 24;
		const words = content.trim().split(' ');
		const excerptWords = words.slice(0, wordCount);

		return excerptWords.join(' ') + (words.length > wordCount ? '...' : '');
	}

	openDialog(article: any) {
		this.dialog.open(NewsDialogComponent, {
			width: '60%',
			data: article
		});
	}
}
