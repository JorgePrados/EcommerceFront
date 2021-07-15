import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GridViewService implements OnInit {

  private baseUrl = environment.base_url;
  private controller; 
  constructor( private httpClient: HttpClient) {
      
   }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  setController(baseUrl: string){
    this.controller = baseUrl; 
  }


  getItems(params, method: string = "") {
    if(method == "")
    {
      method = "getAll";
    }
    return this.httpClient.post(`${this.baseUrl}/${this.controller}/${method}`, params);
  }
}
