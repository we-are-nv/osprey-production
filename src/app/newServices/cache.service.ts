import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cachedData: any;
  constructor() { }

  setCachedData(data: any){
    this.cachedData = data
  }

  getCachedData(){
    return this.cachedData
  }
}
