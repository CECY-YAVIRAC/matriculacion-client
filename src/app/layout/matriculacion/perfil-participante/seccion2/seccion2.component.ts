import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Carrera } from '../../modelos/carrera.model';
import { Asignacion } from '../../modelos/asignacion.model';
import { catalogos } from '../../../../../environments/catalogos';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../modelos/user.model';
import { Matricula } from '../../modelos/matricula.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-seccion2',
  templateUrl: './seccion2.component.html',
  styleUrls: ['./seccion2.component.scss']
})
export class Seccion2Component implements OnInit {
  constructor(private spinner: NgxSpinnerService, private service: ServiceService) {
  }


  asignaciones: Array<Asignacion>;
  carreras: Array<Carrera>;
  estadoDatos: string;
  instruccionesAcademica: Array<any>;
  condicionesAcademica: Array<any>;
  modalidades: Array<any>;
  matricula: Matricula;
  opcionesSiNo: Array<any>;
  generos: Array<any>;
  averiguoCursos: Array<any>;
  niveles: Array<any>;
  user: User;
  flag: boolean;
  flag2: boolean;
  asignacion_id: string;
  estaActivo = false;


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.asignaciones = new Array<Asignacion>();
    this.carreras = new Array<Carrera>();
    this.matricula = new Matricula();
    this.estadoDatos = '';
    this.flag2 = false;
    this.condicionesAcademica = catalogos.condicionesAcademica;
    this.instruccionesAcademica = catalogos.instruccionesAcademica;
    this.averiguoCursos = catalogos.averiguoCursos;
    this.generos = catalogos.generos;
    this.niveles = catalogos.niveles;
    this.opcionesSiNo = catalogos.opcionesSiNo;
    this.modalidades = catalogos.modalidadesCursos;
    this.flag = false;
    this.getAsignaciones();
    this.getCarreras();

  }

  updateMatricula(): void {
    this.service.update('matriculas',
      { 'matricula': this.matricula, 'asignacion': { 'id': this.asignacion_id }, 'user_id': this.user.id })
      .subscribe(
        response => {
          swal.fire('Registro exitoso...', 'Se actualizo el registro', 'success');                 
        },
        error => {        
        });
  }

  guardarCambios() {
    if (this.flag) {
      this.updateMatricula();
      console.log('Entro en update');
    }
    else {
      this.createMatricula();
    }
  }


  createMatricula(): void {
    this.matricula.id = this.matricula.id;
    this.service.post('matriculas',
      { 'matricula': this.matricula, 'asignacion': { 'id': this.asignacion_id }, 'user_id': this.user.id })
      .subscribe(
        response => {
          swal.fire('Registro exitoso...', 'Se creo el registro', 'success');                 
        },
        error => {        
        });
  }

  getAsignaciones(): void {
    this.service.get('asignaciones')
      .subscribe(
        response => {
          console.log(response);
          this.asignaciones = response['asignaciones'];
        },
        error => {
        });
  }


  getCarreras(): void {
    this.service.get('carreras')
      .subscribe(
        response => {
          console.log(response);
          this.carreras = response['carreras'];
        },
        error => {
        });
  }

  getMatricula() { 
    if (this.asignacion_id != '0') {
      this.flag2 = true;
    } else { this.flag2 = false; }
    this.spinner.show();
    this.service.get('matriculas/get_one?user_id=' + this.user.id + '&asignacion_id=' + this.asignacion_id).subscribe(
      response => {
        this.spinner.hide();
        if (response['matricula'] == null) {
          this.flag = false;
          swal.fire('No se encuentra matriculado', 'Complete el formulario para matricularse', 'info');
        }
        else {
          this.matricula = response['matricula'];         
          this.flag = true;          
          swal.fire('Ya se encuentra matriculado', 'Puede editar su información si lo requiere', 'info');
        }
      },
      error => {
        this.spinner.hide();
      });
  }

}
