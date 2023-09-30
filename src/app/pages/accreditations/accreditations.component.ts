import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-accreditations',
  templateUrl: './accreditations.component.html',
  styleUrls: ['./accreditations.component.scss']
})
export class AccreditationsComponent implements OnInit{
  
  displayedColumns: string[] = ['header', 'mark', 'use'];
  constructor(private accreditationsService: DatabaseService){}
  atex: any = [];
  ingress: any = [];

  ngOnInit(){
    this.accreditationsService.getCredits('atex').subscribe(data=>{
      this.atex = data.data;
    })
    this.accreditationsService.getCredits('ingress').subscribe(data=>{
      this.ingress = data.data;
    })
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({block: 'center',behavior: 'smooth'});
}
}
