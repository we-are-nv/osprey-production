import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-accreditations',
  templateUrl: './accreditations.component.html',
  styleUrls: ['./accreditations.component.scss']
})
export class AccreditationsComponent implements OnInit{
  constructor(private accreditationsService: DatabaseService){}
  atext: string;
  ngOnInit(){
    
  }
}
