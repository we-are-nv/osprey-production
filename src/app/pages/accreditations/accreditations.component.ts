import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-accreditations',
  templateUrl: './accreditations.component.html',
  styleUrls: ['./accreditations.component.scss']
})
export class AccreditationsComponent implements OnInit{
  constructor(private accreditationsService: DatabaseService){}
  atex: string;
  ngOnInit(){
    this.accreditationsService.getCredits('atex').subscribe(data=>{
      console.log(data)
    })
  }
}
