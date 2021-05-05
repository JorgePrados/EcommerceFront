import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;
  public menuItems: any[];


  constructor(private sidebarService: SidebarService, usuarioService: UsuarioService) {
    console.log(sidebarService.menu);
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
   }

  ngOnInit() {
  }

}
