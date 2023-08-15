import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NewMarketService } from './new-market.service';
import { NewCategoryService } from './new-category.service';
import { NewServiceService } from './new-service.service';
import { NewProductService } from './new-product.service';
import { NewResourceService } from './new-resource.service';
import { CacheService } from './cache.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class IntialiseService {
	API_URL = environment.API_URL;

	constructor(
		private http: HttpClient,
		private marketService: NewMarketService,
		private productService: NewProductService,
		private categoryService: NewCategoryService,
		private serviceService: NewServiceService,
		private resourceService: NewResourceService,
		private cacheService: CacheService
	) {}

  // Get all top level data needed for the toolbar etc and store in the cache
	getAllTopLevel(): Observable<any[]> {
		return this.http.get<any[]>(`${this.API_URL}/initialise`).pipe(
			tap(data => {
				this.cacheService.setCachedData(data);
			})
		);
	}
}
