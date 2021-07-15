import { NgModule } from '@angular/core';

import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes: Routes = [

  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: {titulo: 'Usuarios'} }
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
