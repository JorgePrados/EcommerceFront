import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { gridViewParams } from 'src/app/models/grid-view-params.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  
  inputSearchItems: Subject<boolean> = new Subject();

  gridViewParams: any;


  constructor() { }

  ngOnInit() {
    this.gridViewParams = new gridViewParams();
    this.gridViewParams.controller = "Product";
    this.gridViewParams.columnId = "productId";
    this.gridViewParams.detailRedirection = "ProductDetail";
    this.gridViewParams.tableId = 1;
    this.gridViewParams.title = "Artículos";
    this.gridViewParams.subTitle = "Artículos registrados en la aplicación";
  }

  setSearch(value: string){
    this.gridViewParams.search = value;
    this.inputSearchItems.next(true);
  }

}
