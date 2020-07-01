import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JobFilter, JobGreenhouse } from 'src/app/models';
import configJobSearchApi from 'src/app/config.job-search-api';


@Injectable({
  providedIn: 'root'
})
export class JobSearchService {

  constructor(private http: HttpClient) { }

  fetchJobCategory() {
    const api = new RestApiService(this.http, 'job-category-search.json', configJobSearchApi.environment);
    api.setHeadersTxt();
    api.url_devpath = configJobSearchApi.url_devpath
    api.url = '/api/remote-jobs/categories'    

    return api.fetch();
  }

  fetchRemotiveJobSearch(filter: JobFilter) {
    const api = new RestApiService(this.http, 'job-search.json', configJobSearchApi.environment);    
    api.setHeadersTxt();
    api.url_devpath = configJobSearchApi.url_devpath    
    api.url = `/api/remote-jobs?category=${filter.category}&tags=${filter.tags}&tag_operator=or&limit=${filter.displayCount}`
       
    return api.get().pipe(map((txt) => JSON.parse(txt))) 
  }

  fetchGreenHouseJobs(filter: JobFilter) {    
    const api = new RestApiService(this.http, 'greenhouse-jobs.json', configJobSearchApi.environment);    
    api.url_devpath = configJobSearchApi.url_devpath    
    api.url = `https:${configJobSearchApi.greenhouseapi_host}boards/automatticremotive/jobs`
       
    return api.fetch<JobGreenhouse[]>()
  }
  

}
