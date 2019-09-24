import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ServiceService} from '../../service.service';
import {catalogos} from '../../../../../environments/catalogos';
import {Participante} from '../../modelos/participante.model';
import {NgxSpinnerService} from 'ngx-spinner';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import {Matricula} from '../../modelos/matricula.model';
import {Asignacion} from '../../modelos/asignacion.model';
import {User} from '../../modelos/user.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  @ViewChild('encabezadoHojaVida') encabezadoHojaVida: ElementRef;
  @ViewChild('cuerpoHojaVida') cuerpoHojaVida: ElementRef;
  @ViewChild('pieHojaVida') pieHojaVida: ElementRef;
 

  constructor(private spinner: NgxSpinnerService, private service: ServiceService) {
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


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.flagFormulario = false;  
    this.matricula = new Matricula();    
    this.asignaciones = new Asignacion();  
    this.instruccionesAcademica = catalogos.instruccionesAcademica;  
    this.participante = new Participante();  
    this.etnias = catalogos.etnias;
    this.sexos = catalogos.sexos;
    this.generos = catalogos.generos;
    this.opcionesSiNo = catalogos.opcionesSiNo;
    this.opcionesSiNoNA = catalogos.opcionesSiNoNA;
    this.tiposIdentificacion = catalogos.tiposIdentificacion;
    this.averiguoCursos = catalogos.averiguoCursos;
    this.modalidades = catalogos.modalidadesCursos;
    this.paralelos = catalogos.paralelos;    
    this.getMatriculasParticipantes();
  }
  
 
  /*consulta el select matriculas*/
  getMatriculasParticipantes(): void {
   this.service.get('matriculas/participantes?user_id='+ this.user.id)
      .subscribe(
        response => {         
          this.matriculas = response['matriculas'];
          console.log('Matriculas',response);                  
        },
        error => {          
        });
  }  

  
/*ingresa los datos al formulario de la inscripcion*/
  obtenerDatosMatricula(asignacionId){
    this.asignacion_id = asignacionId;
    this.getParticipante();
    this.getMatricula();
  
  }

/*llama al formulario lo del participante*/
   getParticipante() {
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

   
/*llama al formulario lo de la matricula*/
getMatricula() {  
  this.spinner.show();
  this.service.get('matriculas/get_one?user_id=' + this.user.id + '&asignacion_id=' + this.asignacion_id).subscribe(
    response => {
      this.spinner.hide();
      if (response['matricula'] == null) {       
        swal.fire('NO ESTA INSCRITO EN NINGUN CURSO', 'Favor Complete Información Curso Para Inscribirse', 'info');
      }
      else {
        this.matricula = response['matricula'];             
        swal.fire('ESTA USTED INSCRITO', 
        'Favor acerquese al Instituto Superior Tecnólogico Yavirac con el formulario impreso para legalizar su matriculación',
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
              doc.addImage(cuerpoHojaDatosImg, 'PNG', 20, 40, 165, 230);
              doc.addImage(pieHojaDatosImg, 'PNG', 10, 280, 180, 5);
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

  


  

