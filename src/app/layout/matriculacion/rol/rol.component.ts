 import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { User } from '../modelos/user.model';
import { Rol } from '../modelos/rol.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService, private service: ServiceService, private modalService: NgbModal,
    private activateRoute: ActivatedRoute, ) {
  }

  users: Array<User>;   
  userNuevo: User;
  userSeleccionada: User;
  buscador: string;
  flagPagination: boolean;
  flagRoles:boolean;
  roles: Array<Rol>; 

  ngOnInit() {
    this.userSeleccionada = new User();
    this.userNuevo = new User();
    this.users = new Array<User>();  
    this.buscador = '';
    this.flagPagination = true;
    this.roles = new Array<Rol>();
    this.flagRoles = false; 
    this.getUser();
   
  
    
  
  }


  getUser(): void {
    this.service.get('users')
      .subscribe(
        response => {
          this.users = response['users'];
        },
        error => {
        });
  }  

  getUserParticipante(): void {
    this.flagRoles = true;
    this.service.get('users/participantes')
      .subscribe(
        response => {
          this.users = response['users'];
        },
        error => {
        });
  }  

  cambiarEstadoFlagRoles() {
    this.flagRoles = false;
    this.getUser();

  }
  
  
  
  getRol(): void {   
    this.service.get('roles')
      .subscribe(
        response => {
          console.log(response);
          this.roles = response['roles'];
        },
        error => {
        });
  }  

  createUser() {
    console.log(this.userNuevo);
    let facilitador = this.userNuevo.name.split(" ");
    this.spinner.show();
    this.service.post('users', { 'user': this.userNuevo, 'nombre1': facilitador[0], 'apellido1': facilitador[1] }).subscribe(
      response => {
        this.getUser();
        this.spinner.hide();
        this.userNuevo = new User();
        swal.fire(
          'Creado!',
          'Usted a creado un nuevo rol.',
          'success'
          );   
      },
      error => {
        this.spinner.hide();
      });
  }

  openUser(content, user: User, flag: boolean) {
    console.log(flag);
    if (flag) {
      this.userNuevo = new User();
      console.log('si');
    } else {
      this.userNuevo = user;
      console.log('no');
    }
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if (resultModal === 'save') {
          if (flag) {
            console.log('create');
            this.createUser();
          } else {
            console.log('update');
            this.updateUser();
          }
        }
      }), (resultCancel => {

      }));
  }

  filter(event) {
    if (event.which === 13 || this.buscador.length === 0) {
      if (this.buscador.length === 0) {
        this.flagPagination = true;
        this.getUser();
      } else {
        this.flagPagination = false;
        this.getBuscar();
      }
    }
  }

  filterParticipante(event) {
    if (event.which === 13 || this.buscador.length === 0) {
      if (this.buscador.length === 0) {
        this.flagPagination = true;
        this.getUserParticipante();
      } else {
        this.flagPagination = false;
        this.getBuscarParticipante();
      }
    }
  }

  getBuscar() {
    this.buscador = this.buscador.toUpperCase();
    const parametros =
      '?identificacion=' + this.buscador
      + '&user_name=' + this.buscador
      + '&name=' + this.buscador;
    this.spinner.show();
    this.service.get('users/filter' + parametros).subscribe(
      response => {
        console.log(response);
        this.users = response['users'];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }


  getBuscarParticipante() {
    this.buscador = this.buscador.toUpperCase();
    const parametros =
      '?identificacion=' + this.buscador
      + '&user_name=' + this.buscador
      + '&name=' + this.buscador;
    this.spinner.show();
    this.service.get('users/filter/participantes' + parametros).subscribe(
      response => {
        console.log(response);
        this.users = response['users'];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  deleteUser(user) {
    swal.fire(({
      title: 'Esta usted seguro?',
      text: "Va a borrar un rol existente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo borrarlo!'
    }))
      .then((result) => {
        if (result.value) {
          this.spinner.show();
          this.service.delete('users?user_id=' + user.id ).subscribe(
            response => {
              this.getUser();
              this.spinner.hide();
              swal.fire(
                'Borrado!',
                'Usted ha borrado un rol existente.',
                'success'
              );
            },
            error => {
              this.spinner.hide();
            });
        }
      });
  }
  
  updateUser() {
    swal.fire(({
      title: 'Esta usted seguro?',
      text: "Va a actualizar un rol existente!",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#c44',
      confirmButtonText: 'Si, deseo actualizarlo!'
    }))
    .then((result) => {
      if (result.value) {    
    let facilitador = this.userNuevo.name.split(" ");   
    this.service.update('users', { 'user': this.userNuevo, 'nombre1': facilitador[0], 'apellido1': facilitador[1] }).subscribe(
      response => {
        this.getUser();
        this.spinner.hide();
        this.userNuevo = new User();
        swal.fire(
          'Actualizado!',
          'Usted actualizo un rol existente.',
          'success'
        );
      }
    );
}
});
}    
}








