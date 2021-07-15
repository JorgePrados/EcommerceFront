import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url + "/ColumnTableManagment";

@Injectable({
  providedIn: 'root'
})

export class ColumnTableManagmentService {

  constructor(private httpClient: HttpClient) { }

  getColumnsTable(tableId: number) {
    return this.httpClient.get(`${base_url}/getColumnsTable?tableId=${tableId}`);
  }
  addConfigurationColumnsTable(columns){
    return this.httpClient.post(`${base_url}/addConfigurationColumnsTable`,columns);
  }
}
