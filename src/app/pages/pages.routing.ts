import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';
import { PagesComponent } from './pages.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { AdminGuard } from '../guards/admin.guard';
import { ProductsListComponent } from './masters/products/products-list/products-list.component';
import { ProductDetailComponent } from './masters/products/product-detail/product-detail.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        children: [
            { path: '', redirectTo: '/', pathMatch: 'full'},
            { path: 'ProductsList', component: ProductsListComponent, data: {titulo: 'Listado de Productos'} },
            { path: 'ProductDetail/:id', component: ProductDetailComponent, data: {titulo: 'Detalle Producto'} },
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Usuarios'} }
        ]
        //loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
    }
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
