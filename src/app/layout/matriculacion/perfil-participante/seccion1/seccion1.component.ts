import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../../service.service';
import {Participante} from '../../modelos/participante.model';
import {catalogos} from '../../../../../environments/catalogos';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../../modelos/user.model';


@Component({
  selector: 'app-seccion1',
  templateUrl: './seccion1.component.html',
  styleUrls: ['./seccion1.component.scss']
})
export class Seccion1Component implements OnInit {
  constructor(private spinner: NgxSpinnerService, private service: ServiceService) {
  }

  estadoDatos: string; 
  participante: Participante; 
  sexos: Array<any>;
  generos: Array<any>;
  etnias: Array<any>;   
  user: User;

  ngOnInit() {
    this.estadoDatos = '';
    this.user = JSON.parse(localStorage.getItem('user')) as User;    
    this.participante = new Participante();   
    this.sexos = catalogos.sexos; 
    this.generos = catalogos.generos;   
    this.etnias = catalogos.etnias; 
    this.getParticipantes();
    
  }

  updateParticipante(): void {
    this.estadoDatos = 'Guardando......';
    this.participante.id= this.participante.id;
    this.service.update('participantes',
      {'participante': this.participante})
      .subscribe(
        response => {  
        this.estadoDatos = '';       
        },
        error => {   
        this.estadoDatos = '';      
        });
  }
  
  getParticipantes() {
    this.spinner.show();
    this.service.get('participantes/get_one?user_id=' + this.user.id).subscribe(
      response => {
        this.participante = response['participante'];              
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
     });
  }

}
