import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ProductsListComponent } from "./masters/products/products-list/products-list.component";
import { ProductDetailComponent } from "./masters/products/product-detail/product-detail.component";
import { GridViewComponent } from './template/grid-view/grid-view.component';


@NgModule({
  declarations: [
    PagesComponent,
    UsuariosComponent,
    ProductsListComponent,
    ProductDetailComponent,
    GridViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    AppRoutingModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
