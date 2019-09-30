import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from '../service.service';
import {Matricula} from '../modelos/matricula.model';
import {Asignacion} from '../modelos/asignacion.model';
import {Router} from '@angular/router';
import {catalogos} from '../../../../environments/catalogos';
import {Participante} from '../modelos/participante.model';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import {environment} from '../../../../environments/environment';

import 'jspdf-autotable';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {User} from '../modelos/user.model';
import { TipoDescuento } from '../modelos/tipo-descuento.model';

@Component({
  selector: 'app-cupo',
  templateUrl: './cupo.component.html',
  styleUrls: ['./cupo.component.scss']
})
export class CupoComponent implements OnInit {
  matricula: Array<Matricula>;
  descuento: Array<any>;
  valor_total: number;
  asignaciones: Array<Asignacion>;
  condicionesFinanciero: Array<any>;
  tipo_descuentos: TipoDescuento;   
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
    this.condicionesFinanciero = catalogos.condicionesFinanciero;     
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
    this.getTipoDescuento();

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
  pagoMatricula(matricula: Matricula, valor_descuento) {
    swal.fire('PAGO DE LA MATRICULA','Proceda a pulsar OK para aceptar el pago','success')
      .then((result) => {
        if (result.value) {
          this.spinner.show();
          this.service.get('matriculas/pago?id='+matricula.id+'&valor_total='+matricula.valor_total+'&tipo_descuento='+matricula.tipo_descuento+
          '&valor_descuento='+valor_descuento).subscribe(
            response => {
              this.getBuscar();
              this.spinner.hide();
              swal.fire(
                'Cobrado!',
                'Usted ha cobrado el del curso.',
                'success' 
              );                               
            },
            error => {
              this.spinner.hide();              
            });
        }
      });
  }

   /*selecciona la devolucion del pago de la matricula*/
   devolverMatricula(matricula: Matricula) {
    swal.fire('DEVOLUCIÓN DEL PAGO DE LA MATRICULA','Proceda a pulsar OK para devolver el pago','success')
      .then((result) => {
        if (result.value) {
          this.spinner.show();
          this.service.get('matriculas/devolver?id=' + matricula.id).subscribe(
            response => {
              this.getBuscar();
              this.spinner.hide();
              swal.fire(
                'Devuelto!',
                'Usted ha devuelto el valor del curso.',
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
        this.descuento = [this.asignaciones.length];
        for (let index = 0; index < this.asignaciones.length; index++) {
          this.descuento[index] = 0;          
        }
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

   /*consulta el select de los descuentos*/
  getTipoDescuento(): void {
    this.service.get('tipo_descuentos')
      .subscribe(
        response => {          
          this.tipo_descuentos = response['tipo_descuentos'];  
          console.log(this.tipo_descuentos);           
        },
        error => {          
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
    const parametros =
        '?participante_identificacion=' + this.buscador;   
    this.spinner.show();
    this.service.get('matriculas/filter' + parametros).subscribe(
      response => {     
        console.log(response);        
        this.matriculas = response['matriculas'];
        this.valor_total= response['total_a_pagar'];  
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();        
      });
  }
  

}
