import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileuploadService } from '../../services/fileupload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {


  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private fileuploadService: FileuploadService) {

    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, Validators.required, Validators.email]
    });
    
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
        .subscribe(resp => {
          const {nombre, email} = this.perfilForm.value
            this.usuario.nombre = nombre;
            this.usuario.email = email;
            Swal.fire('Guardado', 'Los cambios fueron guardados', 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  cambiarImagen( file: File ){
    this.imagenSubir = file;

    if(!file) {
      return this.imgTemp == null;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen(){
    this.fileuploadService
      .actualizarFoto(this.imagenSubir,'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }, (err) => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

}
