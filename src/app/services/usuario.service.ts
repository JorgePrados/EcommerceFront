import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';

import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import Swal from 'sweetalert2';


const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) { 
    this.googleInit();
  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  googleInit(){
    
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '581359211611-t6d42bq79t5hs9s5vkegb4uho6la38o5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve(true);
      });
    });
  }

  logout(){
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      }); 
    });
  }
    


  validarToken(): Observable<boolean> {
    
    return this.http.get(`${ base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        const {nombre, email, role, google, img = '', uid} = resp.usuario;

        this.usuario = new Usuario( nombre, email, '', role,google, img, uid);
        this.usuario = resp.usuario;
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${ base_url}/usuarios`, formData)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);

      })
    );
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string}) {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${ base_url}/usuarios(${this.uid})`, data, this.headers)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);

      })
    );
  }

  login(formData: LoginForm){
    return this.http.post(`${ base_url}/login`, formData)
              .pipe(
                tap((resp: any) => {
                  localStorage.setItem('token', resp.token);

                })
              );
  }

  loginGoogle(token){
    return this.http.post(`${ base_url}/login/google`, {token})
              .pipe(
                tap((resp: any) => {
                  localStorage.setItem('token', resp.token);

                })
              );
  }

  cargarUsuario(desde: number = 0){
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
                .pipe(
                  map(resp => {
                    const usuarios = resp.usuarios.map(
                      user => new Usuario(user.nombre, user.email, user.password,user.role, user.google, user.img, user.uid)
                    );
                    return {
                      total: resp.total,
                      usuarios
                    };
                  })
                )

  }

  eliminarUsuario(usuario: Usuario){
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario){
      return this.http.put(`${ base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
    }

}
