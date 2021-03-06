import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from '../../service.service';
import {Participante} from '../../modelos/participante.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {catalogos} from '../../../../../environments/catalogos';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {Matricula} from '../../modelos/matricula.model';
import {Asignacion} from '../../modelos/asignacion.model';
import {User} from '../../modelos/user.model';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-matricula',
  templateUrl: './dashboard-matricula.component.html',
  styleUrls: ['./dashboard-matricula.component.scss']
})
export class DashboardMatriculaComponent implements OnInit {
  @ViewChild('encabezadoHojaVida') encabezadoHojaVida: ElementRef;
  @ViewChild('cuerpoHojaVida') cuerpoHojaVida: ElementRef;
  @ViewChild('pieHojaVida') pieHojaVida: ElementRef;



  constructor(private spinner: NgxSpinnerService, private service: ServiceService,
              private navParamsService: ActivatedRoute) {
  this.spinnerConfiguracion = catalogos.spinnerConfiguracion[0];
  }

  edad: number;
  spinnerConfiguracion: any;
  matricula: Matricula;
  matriculas: Array<Matricula>;  
  asignaciones: Asignacion; 
  participante: Participante;
  tiposIdentificacion: Array<any>;  
  instruccionesAcademica: Array<any>;
  modalidades: Array<any>;
  opcionesSiNo: Array<any>;
  opcionesSiNoNA: Array<any>; 
  sexos: Array<any>;
  generos: Array<any>;
  etnias: Array<any>;
  averiguoCursos: Array<any>;  
  paralelos: Array<any>;  
  user: User;
  flagFormulario: boolean;
  asignacion_id: string;
  matricula_id: Number;


  ngOnInit() {   
    this.matricula_id = this.navParamsService.snapshot.params.id;
    this.flagFormulario = false;  
    this.matricula = new Matricula();    
    this.asignaciones = new Asignacion(); 
    this.participante = new Participante();
    this.getMatricula();  
  }
  

  
/*llama al formulario lo de la matricula*/
getMatricula() {    
  this.spinner.show();
  this.service.get('matriculas/get_one?id_matricula=' + this.matricula_id).subscribe(
    response => {
      this.spinner.hide();
      if (response['matricula'] == null) {       
        swal.fire('EL FORMULARIO INDICA QUE NO ESTA MATRICULADO EN NINGUN CURSO', 'Favor complete la matricula', 'info');
      }
      else {
        this.matricula = response['matricula'];     
        console.log('matricula es ', this.matricula);        
        swal.fire('FORMULARIO DE MATRICULA EXITOSO', 
        'Todo esta en pefecto orden',
        'success');
      }
    },
    error => {
      this.spinner.hide();
    });
}

/*  imprime el formulario */
  imprimir() {
    this.spinner.show();
    html2canvas(this.encabezadoHojaVida.nativeElement).then(canvasEncabezado => {
      const encabezadoHojaDatosImg = canvasEncabezado.toDataURL('image/png');
      html2canvas(this.cuerpoHojaVida.nativeElement).then(canvasCuerpo => {
        const cuerpoHojaDatosImg = canvasCuerpo.toDataURL('image/png');
        html2canvas(this.pieHojaVida.nativeElement).then(canvasPie => {
          const pieHojaDatosImg = canvasPie.toDataURL('image/png');        
              const doc = new jsPDF();
              doc.addImage(encabezadoHojaDatosImg, 'PNG', 10, 10, 190, 25);
              doc.addImage(cuerpoHojaDatosImg, 'PNG', 20, 40, 180, 60);
              doc.addPage();
              doc.addImage(encabezadoHojaDatosImg, 'PNG', 10, 10, 190, 30);      
              doc.save('FORMULARIO-MATRICULA' + '.pdf');
              window.open(doc.output('bloburl'));
              this.spinner.hide();
            });
          });
        });   
  }
}

  


  

