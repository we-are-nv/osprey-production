import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-bonus-card',
  templateUrl: './bonus-card.component.html',
  styleUrls: ['./bonus-card.component.scss']
})
export class BonusCardComponent implements OnInit{
  constructor(private fileService: FilesService){}
  @Input() card: any;
  ngOnInit(){
    this.fileService.getFilesObservable().subscribe(data =>{
    })
    this.fileService.getFiles()
  }
  
}