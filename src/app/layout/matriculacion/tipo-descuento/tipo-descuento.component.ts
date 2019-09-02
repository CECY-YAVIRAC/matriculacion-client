import {Component,OnInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {TipoDescuento} from '../modelos/tipo-descuento.model';

import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-descuento',
  templateUrl: './tipo-descuento.component.html',
  styleUrls: ['./tipo-descuento.component.scss']
})
export class TipoDescuentoComponent implements OnInit {  
    constructor(private spinner: NgxSpinnerService, private service: ServiceService,private modalService: NgbModal) {
    }
   
  tipo_descuentos: TipoDescuento; 
  tipo_descuentosNuevo: TipoDescuento; 
  buscador: string;
  flagPagination: boolean;

  
    
   
  ngOnInit() {
       
    this.tipo_descuentosNuevo = new TipoDescuento();      
    this.buscador = '';
    this.flagPagination = true;
    this. getTipoDescuento();
    
      
  }

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
   

  createTipoDescuento() {
    console.log (this.tipo_descuentosNuevo);
    this.spinner.show();    
    this.service.post('tipo_descuentos', {'tipodescuento': this.tipo_descuentosNuevo}).subscribe(
      response => {
        this.getTipoDescuento();
        this.spinner.hide();        
        this.tipo_descuentosNuevo = new TipoDescuento();
      },
      error => {
        this.spinner.hide();
      });
  }
  
  openTipoDescuento(content,tipo_descuentos: TipoDescuento, flag:boolean) {
    console.log (flag);  
    if(flag){
      this.tipo_descuentosNuevo= new TipoDescuento();
      console.log('si');
    }  else{
      this.tipo_descuentosNuevo= tipo_descuentos;
      console.log('no');
    }
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if (resultModal === 'save') {
          if (flag) {
            console.log('create');
            this.createTipoDescuento();
          }else{
            console.log('update');
            this.updateTipoDescuento(tipo_descuentos);
          }
        }       
      }), (resultCancel => {

      }));
  } 
  
  deleteTipoDescuento(tipodescuento) {
    swal.fire(({
     title: 'Esta usted seguro?',
     text: "Va a borrar un Tipo de Descuento existente!",
     type: 'question',
     showCancelButton: true,
     confirmButtonColor: '#3048d6',
     cancelButtonColor: '#c44',
     confirmButtonText: 'Si, deseo borrarlo!'
   }))
       .then((result) => {
         if (result.value) {           
           this.spinner.show();
           this.service.delete('tipo_descuentos?tipodescuento_id=' + tipodescuento.id).subscribe(
               response => {               
               this.getTipoDescuento();
               this.spinner.hide();               
               swal.fire(
                 'Borrado!',
                 'Usted ha borrado un Tipo de Descuento existente.',
                 'success'
               );             
            },
             error => {
              this.spinner.hide();              
             });
         }
      });   
  }

  updateTipoDescuento(tipo_descuentos: TipoDescuento): void {
    swal.fire(({
      title: 'Esta usted seguro?',
      text: "Va a actualizar un Tipo de Descuento existente!",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#c44',
      confirmButtonText: 'Si, deseo actualizarlo!'
    }))
    .then((result) => {
      if (result.value) {  
    this.service.update('tipo_descuentos',
      {'tipodescuento': tipo_descuentos})
      .subscribe(
        response => { 
          swal.fire(
            'Actualizado!',
            'Usted actualizo un Tipo de Descuento existente.',
            'success'
            );             
          }
          );
       }
    });   
}
 }