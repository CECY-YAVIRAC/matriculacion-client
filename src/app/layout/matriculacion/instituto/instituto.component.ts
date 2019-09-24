import {Component,OnInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {Instituto} from '../modelos/instituto.model';
import {NgxSpinnerService} from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-instituto',
  templateUrl: './instituto.component.html',
  styleUrls: ['./instituto.component.scss']
})
export class InstitutoComponent implements OnInit {  
    constructor(private spinner: NgxSpinnerService, private service: ServiceService, private modalService: NgbModal, 
      private activateRoute: ActivatedRoute,  ) {
    }
 
  institutos: Array<Instituto>; 
  institutoNuevo: Instituto;
  institutoSeleccionada: Instituto;
  buscador: string;
  flagPagination: boolean; 

  ngOnInit() {
    this.institutoSeleccionada = new Instituto();  
    this.institutoNuevo = new Instituto();
    this.institutos = new Array<Instituto>();
    this.buscador = '';
    this.flagPagination = true;
    this.getInstituto();  
  }
 
  
  getInstituto(): void {
    this.service.get('institutos')
      .subscribe(
        response => {          
          this.institutos = response['institutos'];           
        },
        error => {          
        });
  }

  createInstituto() {
    console.log (this.institutoNuevo);
    this.spinner.show();    
    this.service.post('institutos', {'instituto': this.institutoNuevo}).subscribe(
      response => {
        this.getInstituto();
        this.spinner.hide();        
        this.institutoNuevo = new Instituto();
        swal.fire(
          'Creado!',
          'Usted a creado un nuevo instituto.',
          'success'
          );   
      },
      error => {
        this.spinner.hide();
      });
  }
  
  openInstituto(content,institutos: Instituto, flag:boolean) {
    console.log (flag);  
    if(flag){
      this.institutoNuevo= new Instituto();
      console.log('si');
    }  else{
      this.institutoNuevo= institutos;
      console.log('no');
    }
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if (resultModal === 'save') {
          if (flag) {
            console.log('create');
            this.createInstituto();
          }else{
            console.log('update');
            this.updateInstituto(institutos);
          }
        }       
      }), (resultCancel => {

      }));
  } 

  filter(event) {
    if (event.which === 13 || this.buscador.length === 0) {
      if (this.buscador.length === 0) {
        this.flagPagination = true;
        this.getInstituto();
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
      + '&codigo=' + this.buscador
      + '&nombre=' + this.buscador;
    this.spinner.show();
    this.service.get('institutos/filter' + parametros).subscribe(
      response => {     
        console.log(response);
        this.institutos = response['institutos'];   
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();        
      });
  }

  deleteInstituto(instituto) {
     swal.fire(({
      title: 'Esta usted seguro?',
      text: "Va a borrar un instituto existente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo borrarlo!'
    }))
        .then((result) => {
          if (result.value) {           
            this.spinner.show();
            this.service.delete('institutos?instituto_id=' + instituto.id).subscribe(
                response => {               
                this.getInstituto();
                this.spinner.hide();               
                swal.fire(
                  'Borrado!',
                  'Usted ha borrado un instituto existente.',
                  'success'
                );             
             },
              error => {
               this.spinner.hide();              
              });
          }
       });   
   }

   updateInstituto(institutos: Instituto): void {
    swal.fire(({
      title: 'Esta usted seguro?',
      text: "Va a actualizar un instituto existente!",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#c44',
      confirmButtonText: 'Si, deseo actualizarlo!'
    }))
    .then((result) => {
      if (result.value) {  
    this.service.update('institutos',
      {'instituto': institutos})
      .subscribe(
        response => { 
          swal.fire(
            'Actualizado!',
            'Usted actualizo un instituto existente.',
            'success'
            );             
          }
          );
       }
    });   
}
  }



  




