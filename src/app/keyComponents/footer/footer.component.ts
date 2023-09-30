import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';

@Component({
	selector: 'app-footer',
  templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	constructor(private fileService: FilesService){}
	filesArray: any[] = [];
	ngOnInit(): void {
		this.fileService.getFilesObservable().subscribe((data:any)=>{
			this.filesArray = data;
		})
		this.fileService.getFiles()
		
	}
	openPDF(tag: any){
		var result = this.filesArray.find(obj => {
		  return obj.ETag === tag
		})
		window.open(result.Key, '_blank');
	  }
}
