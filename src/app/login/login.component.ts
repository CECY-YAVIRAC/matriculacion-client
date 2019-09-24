import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {routerTransition} from '../router.animations';
import {ServiceService} from '../layout/matriculacion/service.service';
import swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../layout/matriculacion/modelos/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  user: User;
  correoValido: boolean;
  validateLogin: boolean;

  constructor(private spinner: NgxSpinnerService, private service: ServiceService, private translate: TranslateService,
              public router: Router
  ) {
    this.translate.addLangs(['es']);
    this.translate.setDefaultLang('es');    
    this.translate.use('es');
  }

  ngOnInit() {
    this.validateLogin = true;
    this.correoValido = false;
  }

  onLoggedin(event) {
    if (event.which === 13 || event === 13) {
      // muestra el cargando
      this.spinner.show();
      this.userName = this.userName.toLocaleLowerCase();      
      this.service.postPublic('login', {
        'email': this.userName,
        'password': this.password
      })
      .subscribe(
        response => {        
          console.log(response['user']);
          // cache 
          localStorage.setItem('isLoggedin', 'true');
          localStorage.setItem('user', JSON.stringify(response['user']));

          if (response['user']['role_id'] == '1') {
            this.router.navigate(['rol']);
          }
          if (response['user']['role_id'] == '2') {           
            this.router.navigate(['perfil-participante']);
          }
          if (response['user']['role_id'] == '3') {
            this.router.navigate(['cupos']);
          }
          if (response['user']['role_id'] == '5') {
            this.router.navigate(['matricula']);
          }
            
          this.validateLogin = false;

          // ocultar el cargando
          this.spinner.hide();
        },
        error => {
          localStorage.removeItem('user');
          localStorage.removeItem('isLoggedin');
          swal.fire('Credenciales Incorrectas', 'Nombre de Usuario y/o Contraseña incorrectos', 'warning');
          this.validateLogin = true;
          this.spinner.hide();
        });
    }
  }

  forgotPassword() {
    if (this.userName != null && this.userName !== '') {     
      if (this.validateCorreoElectronico(this.userName)) {
        this.spinner.show();
        this.service.postPublic('password/email', {'email': this.userName}).subscribe(
          response => {
            console.log(response);
            this.spinner.hide();
            swal.fire('¡Correo Electrónico Enviado!', 'Ingrese a su correo electrónico ', 'success');
          },
          error => {
            console.log(error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedin');
            this.spinner.hide();
            swal.fire('¡Correo Electrónico Enviado!', 'Ingrese a su correo electrónico', 'info');
          });
      }
    } else {
      swal.fire('¡Correo Electrónico Incorrecto!', 'Ingrese un correo válido', 'error');
    }
  }

  validateCorreoElectronico(correoElectronico: string) {
    const expreg = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    if (expreg.test(correoElectronico)) {
      this.correoValido = true;
      return true;
    } else {
      this.correoValido = false;
      return false;
    }
  }
}
