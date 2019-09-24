import {Component,OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {TranslateService} from '@ngx-translate/core';
import {ServiceService} from '../layout/matriculacion/service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../layout/matriculacion/modelos/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { Rol } from '../layout/matriculacion/modelos/rol.model';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,private translate: TranslateService,
              private service: ServiceService, private modalService: NgbModal) {
    
  }

  users: Array<User>;
  roles: Array<Rol>;
  userNuevo: User;

  ngOnInit() {

    this.userNuevo = new User();
    this.users = new Array<User>();   
  }
      

  createSignup() {
    console.log (this.userNuevo);
    this.userNuevo.role_id= '2';
    this.spinner.show();    
    this.service.post('users', {'user': this.userNuevo,'role_id':2}).subscribe(
      response => {
        this.spinner.hide();        
        this.userNuevo = new User();       
          swal.fire(
            'Registrado!',
            'Usted se ha registrado en el sistema.',
            'success'
          );         
      },
      error => {
        this.spinner.hide();
      });
   }

}


