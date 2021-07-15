import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes =  [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes,{
      onSameUrlNavigation: "ignore",
      anchorScrolling:'enabled',
      scrollPositionRestoration: 'enabled'
    } ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
