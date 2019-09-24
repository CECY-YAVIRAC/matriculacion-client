import {Component, OnInit} from '@angular/core';
import {Matricula} from '../modelos/matricula.model';
import {ServiceService} from '../service.service';
import 'jspdf-autotable';
import {catalogos} from '../../../../environments/catalogos';
import {Participante} from '../modelos/participante.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../modelos/user.model';

@Component({
  selector: 'app-perfil-participante',
  templateUrl: './perfil-participante.component.html',
  styleUrls: ['./perfil-participante.component.scss']
})
export class PerfilParticipanteComponent implements OnInit {
  errors: string;
  doc: any;
  messages: any;
  participante: Participante;  
  matricula: Matricula;
  user: User;
  tab: any;

  constructor(private spinner: NgxSpinnerService, private service: ServiceService) {
  }

  ngOnInit() {
    this.messages = catalogos.messages;
    this.matricula = new Matricula();
    this.participante = new Participante();   
  }


  getMatricula() {
    this.service.get('matriculas/matricula').subscribe(
      response => {
        this.participante = response['participante'];
      },
      error => {
        this.spinner.hide();

      });
  }

  getParticipante() {
    this.spinner.show();
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.service.get('participantes/' + this.user.id).subscribe(
      response => {
        this.participante = response['participante'];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

}
