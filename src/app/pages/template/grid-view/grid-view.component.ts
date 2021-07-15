import { Input, OnDestroy } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { gridViewParams } from 'src/app/models/grid-view-params.model';
import { ColumnTableManagmentService } from 'src/app/services/column-table-managment.service';
import { GridViewService } from './grid-view.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit, OnDestroy {

  @Input() gridViewParams: gridViewParams = new gridViewParams();
  @Input() inputSearchItems: Subject<boolean>;

  public items: any[];
  public loading: boolean;
  public page: number;
  public nPages: number;
  public registerTo: number;
  public registerFrom: number;
  public orderBy: string;
  public orderDirection: string;
  public columns: any[];
  public configurationColumnsTable: any[];
  public rowsAffected: number;
  public rowsPage: number;
  public pageList: number[];
  public showColumnModal: boolean;
  public tableId: number;
  
  constructor(private gridViewService: GridViewService, private router: Router, private columnTableManagmentService: ColumnTableManagmentService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.items = [];
    this.page = 1;
    this.nPages = 0;
    this.rowsAffected = 0;
    this.rowsPage = 25;
    this.orderBy = "Code";
    this.orderDirection = "asc";
    this.showColumnModal = false;
    this.tableId = this.gridViewParams.tableId;
    
    this.getItems();
    this.getColumnsTable();

    this.inputSearchItems.subscribe(resp => {
      this.search();
    });

  }

  ngOnDestroy(): void {
    this.inputSearchItems.unsubscribe();
   }

  changeColumnModal() {
    this.getColumnsTable();
    return !this.showColumnModal;
  }

  classDirection(value: string){
    return (value !== this.orderBy) ? 'sorting' : (this.orderDirection === "asc") ? 'sorting_asc' : 'sorting_desc';
  }

  setOrderBy(value: string){
    let order = "asc";

    if(this.orderBy === value)
    {
      if(this.orderDirection === "asc")
        order = "desc";
    }

    this.orderDirection = order;
    
    this.orderBy = value;

    this.page = 1;
    this.getItems();
  }

  setPage(value: number){
    this.page = value;
    this.getItems();
  }

  setPageList(){
    let maxShowPage = 2;
    
    this.pageList = [];
    
    let pageStart = (this.page - maxShowPage > 0) ? this.page - maxShowPage : 1;
    let pageFinish =(this.page + maxShowPage < this.nPages) ? this.page + maxShowPage: this.nPages;

    for(;pageStart <= pageFinish; pageStart++){
      this.pageList.push(pageStart);
    }
  }

  getColumnsTable() {
    this.columnTableManagmentService.getColumnsTable(this.tableId).subscribe(
      (resp: any) => {
        this.configurationColumnsTable = resp.data;
        this.configurationColumnsTable = this.orderColumns();
        this.columns = this.columnsSelected();
      }
    );
  }

  columnsSelected(){
    let columns = [];
    this.configurationColumnsTable.forEach(element => {
      if(element.isSelected)
      {
        columns.push(element);
      }
    });

    return columns;
  }

  addConfigurationColumnsTable() {
    let columns = this.columnsSelected();

    let cont = 1;

    for(var i = 0; i < columns.length; i++){
      columns[i].order = cont;
      cont++;
    }

    this.columnTableManagmentService.addConfigurationColumnsTable(columns).subscribe(
      (resp: any) => {
        this.changeColumnModal();
        this.getItems();
      }
    );
  }

  search(){
    this.page = 1;
    this.getItems();
  }

  getItems(){
    this.loading = true;
    let params = {
      search: this.gridViewParams.search,
      page: this.page,
      orderBy: `${this.orderBy} ${this.orderDirection}`
    };
    
    console.log(params);
    this.gridViewService.setController(this.gridViewParams.controller);
    this.gridViewService.getItems(params).subscribe(
      (resp: any) => {
        console.log(resp.data);
        this.items = resp.data;
        this.rowsAffected = resp.rowsAffected;

        this.loading = false;

        this.nPages = Math.ceil(this.rowsAffected / this.rowsPage);

        let maxRegisterPage = (this.page * this.rowsPage);

        this.registerTo = (this.page * this.rowsPage) - this.rowsPage + 1;
        this.registerFrom = (maxRegisterPage < this.rowsAffected) ? maxRegisterPage : this.rowsAffected;


        this.setPageList();
      });
  }

  changeColumnPosition(column, order){
    if(column.order == 1 && order < 0)
      return;
    
    if(column.order == this.configurationColumnsTable.length && order > 0)
      return;
    
    for(var i = 0; i < this.configurationColumnsTable.length; i++){
      if(this.configurationColumnsTable[i].columnTableId == column.columnTableId) {
        let orderTemp = this.configurationColumnsTable[i].order;
        this.configurationColumnsTable[i].order = this.configurationColumnsTable[i + order].order;
        this.configurationColumnsTable[i + order].order = orderTemp; 
      }

    }

    this.configurationColumnsTable = this.orderColumns();
  }

  orderColumns(){
    let columnsSelected = [];
    let columnsNoSelected = [];

    this.configurationColumnsTable.forEach(element => {
      if(element.order > 0){
        columnsSelected.push(element);
      } else{
        columnsNoSelected.push(element);
      }
    });

    for(var i = 0; i < columnsSelected.length; i++) {
      if(columnsSelected[i].order > 0) {
        for(var j = 0;j < columnsSelected.length - 1; j++){
          if(columnsSelected[j].order > columnsSelected[j + 1].order)
          {
            var temp = columnsSelected[j];
            columnsSelected[j] = columnsSelected[j + 1];
            columnsSelected[j + 1] = temp;
          }
        }
      }
    }
    let cont = (columnsSelected.length > 0) ? columnsSelected[columnsSelected.length - 1].order + 1: 1;

    for(var i = 0; i < columnsNoSelected.length; i++) {
      columnsNoSelected[i].order = cont;
      cont++;
    }
    return columnsSelected.concat(columnsNoSelected);  
  }

  itemDetailNavigation(itemId){
    this.router.navigate([`/${this.gridViewParams.detailRedirection}`, itemId]);
  }
}
