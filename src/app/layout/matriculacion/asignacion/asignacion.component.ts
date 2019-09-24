import {Component,OnInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {Asignacion} from '../modelos/asignacion.model';
import {Curso} from '../modelos/curso.model';
import { Facilitador } from '../modelos/facilitador.model';
import {catalogos} from '../../../../environments/catalogos';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.scss']
})
export class AsignacionComponent implements OnInit {  
    constructor(private spinner: NgxSpinnerService, private service: ServiceService,private modalService: NgbModal) {
    }

    
 
  asignaciones: Asignacion; 
  facilitadorSeleccionado: Facilitador;
  asignacionNuevo: Asignacion;
  asignacionSeleccionada: Asignacion;
  asignacionFacilitadorNuevo: Asignacion;
  buscador: string;
  flagPagination: boolean;
  tipos: Array<any>;  
  cursos: Array<Curso>; 
  facilitadores:Array<Facilitador>;
  asignacionFacilitadores:Array<Facilitador>;
  flagFacilitadores:boolean;
  hora_inicio: string;
  hora_fin: string;
  
  
   

  ngOnInit() {
    this.facilitadorSeleccionado = new Facilitador();
    this.asignacionSeleccionada = new Asignacion();  
    this.asignacionNuevo = new Asignacion(); 
    this.asignacionFacilitadorNuevo = new Asignacion();
    this.buscador = '';
    this.hora_inicio = '';
    this.hora_fin = '';
    this.flagPagination = true;
    this.tipos = catalogos.tiposCursos; 
    this.cursos = new Array<Curso>(); 
    this.flagPagination = true;
    this.flagFacilitadores = false;     
    this.getAsignacion(); 
    this.getCursos();
    
   
  }

  getAsignacion(): void {
    this.service.get('asignaciones')
      .subscribe(
        response => {          
          this.asignaciones = response['asignaciones'] ;
          console.log(this.asignaciones);           
        },
        error => {          
        });
  }

  getCursos(): void {
    this.service.get('cursos')
      .subscribe(
        response => {
          console.log(response);
          this.cursos = response['cursos'];        
        },
        error => {          
        });
  }  

  getAsignacionFacilitadores(asignacion:Asignacion): void { 
    this.flagFacilitadores = true;
    this.service.get('asignaciones/facilitadores?id='+asignacion.id)
      .subscribe(
        response => {          
          this.asignacionSeleccionada = response['asignacion_facilitador'] ;          
          this.asignacionFacilitadores = response['asignacion_facilitador']['facilitadores'] ;          
          console.log(response);           
        },
        error => {          
        });
  }

  getFacilitadores(): void { 
    this.flagFacilitadores = true;
    this.service.get('facilitadores')
      .subscribe(
        response => {          
          this.facilitadores = response['facilitadores'] ;          
          console.log(response);           
        },
        error => {          
        });
  }

  createAsignacion() {
    console.log (this.asignacionNuevo);
    this.spinner.show();    
    this.service.post('asignaciones', {'asignacion': this.asignacionNuevo,'curso': this.asignacionNuevo.curso}).subscribe(
      response => {
        this.getAsignacion();
        this.spinner.hide();        
        this.asignacionNuevo = new Asignacion();
        swal.fire(
          'Creado!',
          'Usted a creado una asignación nueva.',
          'success'
          );   
      },
      error => {
        this.spinner.hide();
      });
  }

  createAsignacionFacilitador() {
    this.spinner.show();    
    this.service.post('asignaciones/facilitadores', {'asignacion': this.asignacionSeleccionada, 'facilitador': this.facilitadorSeleccionado}).subscribe(
      response => {
        this.getAsignacionFacilitadores(this.asignacionSeleccionada);
        this.spinner.hide();      
      },
      error => {
        this.spinner.hide();
      });
  }

  deleteAsignacionFacilitador(asignacion_facilitador) {
    swal.fire(({
     title: 'Esta usted seguro?',
     text: "Va a borrar un facilitador existente!",
     type: 'question',
     showCancelButton: true,
     confirmButtonColor: '#3048d6',
     cancelButtonColor: '#c44',
     confirmButtonText: 'Si, deseo borrarlo!'
   }))
       .then((result) => {
         if (result.value) {           
          this.spinner.show();    
          this.service.post('eliminarFacilitador', {'pivot': asignacion_facilitador.pivot}).subscribe(
            response => {
              this.getAsignacionFacilitadores(this.asignacionSeleccionada);
              this.spinner.hide();      
              swal.fire(
                 'Borrado!',
                 'Usted ha borrado un facilitador existente.',
                 'success'
               );             
            },
             error => {
              this.spinner.hide();              
             });
         }
      });   
  }

  cambiarEstadoFlagFacilitadores() {
    this.flagFacilitadores = false;
  }
  
  openAsignacion(content,asignacion: Asignacion, flag:boolean) {
    console.log (flag);  
    if(flag){
      this.asignacionNuevo= new Asignacion();
      console.log('si');
    }  else{
      this.asignacionNuevo = asignacion;
      console.log('no');
    }
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if (resultModal === 'save') {
          if (flag) {
            console.log('create');
            this.createAsignacion();
          }else{
            console.log('update');
            this.updateAsignacion(asignacion);
          }
        }       
      }), (resultCancel => {
      }));
  } 


  openAsignacionFacilitador(content,asignacionFacilitadores: Asignacion, flag:boolean) {
    console.log (flag);  
    if(flag){
      this.asignacionFacilitadorNuevo= new Asignacion();    
    } 
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if (resultModal === 'save') {
          if (flag) {
            console.log('create');
            this.createAsignacionFacilitador();
          }
        }       
      }), (resultCancel => {
      }));
  } 
  

  filter(event) {
    if (event.which === 13 || this.buscador.length === 0) {
      if (this.buscador.length === 0) {
        this.flagPagination = true;
        this.getAsignacion();
      } else{
        this.flagPagination = false;
        this.getBuscar();
      }
    }
  }

  getBuscar() {
    this.buscador = this.buscador.toUpperCase();
    const parametros =
        '?identificacion=' + this.buscador
      + '&hora_inicio=' + this.buscador
      + '&hora_fin=' + this.buscador;
    this.spinner.show();
    this.service.get('asignaciones/filter' + parametros).subscribe(
      response => {     
        console.log(response);
        this.asignaciones = response['asignaciones'];   
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();        
      });
  }

  deleteAsignacion(asignacion) {
    swal.fire(({
     title: 'Esta usted seguro?',
     text: "Va a borrar una asignación existente!",
     type: 'question',
     showCancelButton: true,
     confirmButtonColor: '#3048d6',
     cancelButtonColor: '#c44',
     confirmButtonText: 'Si, deseo borrarlo!'
   }))
       .then((result) => {
         if (result.value) {           
           this.spinner.show();
           this.service.delete('asignaciones?asignacion_id=' + asignacion.id).subscribe(
               response => {               
               this.getAsignacion();
               this.spinner.hide();               
               swal.fire(
                 'Borrado!',
                 'Usted ha borrado una asignación existente.',
                 'success'
               );             
            },
             error => {
              this.spinner.hide();              
             });
         }
      });   
  }

  updateAsignacion(asignacion: Asignacion): void {
    swal.fire(({
      title: 'Esta usted seguro?',
      text: "Va a actualizar una asignación existente!",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#c44',
      confirmButtonText: 'Si, deseo actualizarlo!'
    }))
    .then((result) => {
      if (result.value) {  
    this.service.update('asignaciones',
      {'asignacion': asignacion})
      .subscribe(
        response => { 
          this.getAsignacion();
          swal.fire(
            'Actualizado!',
            'Usted actualizo una asignación existente.',
            'success'
            );             
          }
          );
       }
    });   
}
}