import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Product } from 'src/app/models/product.model';


const base_url = environment.base_url + "/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  get headers() {
    return {
      headers: {
        'contentType': 'application/x-www-form-urlencoded'
      }
    }
  }
  constructor(private httpClient: HttpClient) { }

  getProducts(params) {
    return this.httpClient.post(`${base_url}/getAll`, params);
  }

  getProductById(id) {
    return this.httpClient.get(`${base_url}/get?productId=${id}`,);
  }

  saveProduct(product: Product) {
    return this.httpClient.post(`${base_url}/save`, product);
  }

  deleteProduct(productId: number) {
    return this.httpClient.delete(`${base_url}/delete?productId=${productId}`);
  }
}
