import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService, private router: Router){

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    /*return this.usuarioService.validarToken()
      .pipe(
        tap( isAuth => {
          if(!isAuth)
            this.router.navigateByUrl('/login');
        })
      );*/

      return true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return true;
      return this.usuarioService.validarToken()
      .pipe(
        tap( isAuth => {
          if(!isAuth)
            this.router.navigateByUrl('/login');
        })
      );
  }
  
}
