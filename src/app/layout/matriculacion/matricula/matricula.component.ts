import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from '../service.service';
import {Matricula} from '../modelos/matricula.model';
import {Asignacion} from '../modelos/asignacion.model';
import {Router} from '@angular/router';
import {Participante} from '../modelos/participante.model';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import 'jspdf-autotable';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {User} from '../modelos/user.model';


@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss']
})

export class MatriculaComponent implements OnInit {

  matricula: Array<Matricula>;
  asignaciones: Array<Asignacion>;  
  erroresCargaCupos: Array<any>;
  urlExportCuposPeriodoAcademico: string;
  urlExportCuposCarrera: string;
  buscador: string;
  archivo: any;
  archivoTemp: any;
  flagCursos: boolean;
  participantes: Array<Participante>;
  actual_page: number;
  records_per_page: number;
  total_pages: number;
  total_register: number;
  total_pages_pagination: Array<any>;
  total_pages_temp: number;
  total_detalle_matriculas_en_proceso: number;
  total_detalle_matriculas_matriculados: number;
  total_detalle_matriculas_aprobados: number;
  flagPagination: boolean;
  messages: any;
  matriculados: Array<any>;
  matriculas: Array<Matricula>; 
  rutaActual: string;
  asignacion_id: string;
  user: User;

  constructor(private spinner: NgxSpinnerService, private service: ServiceService, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.buscador = '';
    this.asignaciones = new Array<Asignacion>();  
    this.matricula = new Array<Matricula>();    
    this.erroresCargaCupos = new Array<any>();
    this.flagPagination = true;
    this.total_pages_pagination = new Array<any>();
    this.total_pages_temp = 10;
    this.records_per_page = 6;
    this.actual_page = 1;
    this.total_pages = 1;  
    this.flagCursos = false;
    this.rutaActual = this.router.url;  
    this.matriculas = new Array<Matricula>();   
    this.getAsignaciones();
  }

  
  /*activa el flag de los cursos*/
  cambiarEstadoFlagCursos() {
    this.flagCursos = false;
    if (this.buscador.trim() === '') {
      this.getAsignaciones();
    } else {
      this.getAsignaciones();
    }
  }

   /*selecciona el pago de la matricula*/
  Matriculacion(matricula: Matricula) {
    swal.fire('USTED SE HA MATRICULADO CON EXITO','Proceda a pulsar OK para aceptar la matricula','success')
      .then((result) => {
        if (result.value) {
          this.spinner.show();
          this.service.get('matriculas/activada?id=' + matricula.id).subscribe(
            response => {
              this.getBuscar();
              this.spinner.hide();
              swal.fire(
                'Matriculado!',
                'Usted se ha matriculado en el curso elegido.',
                'success' 
              );             
            },
            error => {
              this.spinner.hide();              
            });
        }
      });
  }

   
  /*consulta el select matriculas*/
    getMatriculasParticipantesMatriculados(): void {
      this.service.get('matriculas/participantes/matriculados?asignacion_id='+ this.asignacion_id)
         .subscribe(
           response => {         
             this.matriculas = response['matriculas'];
             console.log('Matriculas',response);                  
           },
           error => {          
           });
     }  
 
  /*consulta el select de los cursos*/
  getAsignaciones() {
    this.spinner.show();
    this.service.get('asignaciones').subscribe(
      response => {
        this.asignaciones = response['asignaciones'];
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }
 

  filter(event) {
    if (event.which === 13 || this.buscador.length === 0) {
      if (this.buscador.length === 0) {
        this.flagPagination = true;
        this.getMatriculasParticipantesMatriculados();
      } else{
        this.flagPagination = false;
        this.getBuscar();
      }
    }
  }

  getBuscar() {
    this.buscador = this.buscador.toUpperCase();
    const parametros = '?participante_identificacion=' + this.buscador;   
    this.spinner.show();
    this.service.get('matriculas/filter' + parametros).subscribe(
      response => {     
        console.log(response);
        this.matriculas = response['matriculas'];   
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();        
      });
  }

}
