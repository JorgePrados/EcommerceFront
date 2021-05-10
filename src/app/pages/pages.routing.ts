import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';


const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
           { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
           { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
           { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica Nº1'} },
           { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Settings'} },
           { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
           { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RXJS'} },
           { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'} },
           { path: '', redirectTo: '/dashboard', pathMatch: 'full'},

           // Mantenimientos
           { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios'} },
           { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales'} },
           { path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos'} },
           { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medico'} },
           
        ] 
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
