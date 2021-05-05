import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSumitted = false;

  public registerForm = this.fb.group({
    nombre: ['',[Validators.required, Validators.minLength(3)]],
    email: [localStorage.getItem('email') || '',[Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]

  }, {
    validators: this.passwordsIguales('password', 'password2')
  });


  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  crearUsuario(){
    this.formSumitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){
      return;
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe(resp => {
          // Navegar al Dashboard
          this.router.navigateByUrl('/');
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  campoNoValido(campo: string): boolean {

    if( this.registerForm.get(campo).invalid && this.formSumitted)
      return true;
    else
      return false;
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos').value && this.formSumitted
  }

  contrasennasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if(pass1 !== pass2 && this.formSumitted){
      return true;
    }
    return false;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }
}
