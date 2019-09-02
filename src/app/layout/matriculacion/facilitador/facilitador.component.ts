import {Component,OnInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {Facilitador} from '../modelos/facilitador.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-facilitador',
  templateUrl: './facilitador.component.html',
  styleUrls: ['./facilitador.component.scss']
})
export class FacilitadorComponent implements OnInit {  
    constructor(private spinner: NgxSpinnerService, private service: ServiceService,private modalService: NgbModal) {
    }

 
  facilitadores: Array<Facilitador>;
  facilitadorNuevo: Facilitador;
  facilitadorSeleccionada: Facilitador;
  buscador: string;
  flagPagination: boolean;
  total_pages: number;
 
   

  ngOnInit() {
    this.facilitadorSeleccionada = new Facilitador();  
    this.facilitadorNuevo = new Facilitador();
    this.facilitadores = new Array<Facilitador>();
    this.buscador = '';
    this.flagPagination = true;
    this.getFacilitador();    
  
    
  }
  
  getFacilitador(): void {
    this.service.get('facilitadores')
      .subscribe(
        response => {          
          this.facilitadores = response['facilitadores'];           
        },
        error => {          
        });
  }
  createFacilitador() {
    console.log (this.facilitadorNuevo);
    this.spinner.show();    
    this.service.post('facilitadores', {'facilitador': this.facilitadorNuevo}).subscribe(
      response => {
        this.getFacilitador();
        this.spinner.hide();        
        this.facilitadorNuevo = new Facilitador();
      },
      error => {
        this.spinner.hide();
      });
  }
  
  openFacilitador(content,facilitadores: Facilitador, flag:boolean) {
    console.log (flag);  
    if(flag){
      this.facilitadorNuevo= new Facilitador();
      console.log('si');
    }  else{
      this.facilitadorNuevo= facilitadores;
      console.log('no');
    }
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if (resultModal === 'save') {
          if (flag) {
            console.log('create');
            this.createFacilitador();
          }else{
            console.log('update');
            this.updateFacilitador(facilitadores);
          }
        }       
      }), (resultCancel => {

      }));
  } 

  filter(event) {
    if (event.which === 13 || this.buscador.length === 0) {
      if (this.buscador.length === 0) {
        this.flagPagination = true;
        this.getFacilitador();
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
      + '&cedula=' + this.buscador
      + '&apellido1=' + this.buscador
      + '&apellido2=' + this.buscador;
    this.spinner.show();
    this.service.get('facilitadores/filter' + parametros).subscribe(
      response => {     
        console.log(response);
        this.facilitadores = response['facilitadores'];   
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();        
      });
  }


  deleteFacilitador(facilitador) {
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
           this.service.delete('facilitadores?facilitador_id=' + facilitador.id).subscribe(
               response => {               
               this.getFacilitador();
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

  updateFacilitador(facilitadores: Facilitador): void {
    swal.fire(({
      title: 'Esta usted seguro?',
      text: "Va a actualizar un facilitador existente!",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#c44',
      confirmButtonText: 'Si, deseo actualizarlo!'
    }))
    .then((result) => {
      if (result.value) {  
    this.service.update('facilitadores',
      {'facilitador': facilitadores})
      .subscribe(
        response => { 
          swal.fire(
            'Actualizado!',
            'Usted actualizo un facilitador existente.',
            'success'
            );             
          }
          );
       }
    });   
}
  }  
          
  
