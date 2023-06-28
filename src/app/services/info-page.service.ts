import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {
  
  private API_URL = environment.API_URL;

  
  private activePage = new Subject<any>;
  private activeSubPage = new Subject<any>;


  page : {};

  subPage = {
    name:"Marine",
    Elements:[
      {type:"text", header:"Hi", source:"hello there"},

    ]
  }
  constructor(private http: HttpClient) { }

  getThumbnails(type: string){
    return this.http.get<any>(this.API_URL+ '/info/thumbnail', {params: {type: type}})
  }

  getMainUpdateListener(){
    return this.activePage.asObservable();
  }

  getMainPage(id: string){
    this.http.get<any>(this.API_URL+ '/info/single', {params: {id: id}}).subscribe((data:any)=>{
      this.activePage.next(data)
      console.log(data)
    })
  }

  navGetPage(id:string){
    return this.http.get<any>(this.API_URL+ '/info/single', {params: {id: id}})
  }


  getPageListener(){
    return this.activeSubPage.asObservable();
  }

  getSubPage(id :string){
    this.http
      .get<any>(this.API_URL+ '/info/page', {params: {id: id}})
      .subscribe((data?:any)=>{
      this.activeSubPage.next(data)
    })
  }
}
