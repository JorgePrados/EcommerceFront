import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;

  constructor(usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
   }

  ngOnInit() {
  }

}
