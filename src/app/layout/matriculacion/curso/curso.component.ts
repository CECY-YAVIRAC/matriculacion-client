import {Component,OnInit} from '@angular/core';
import {ServiceService} from '../service.service';
import {Curso} from '../modelos/curso.model';
import {Instituto} from '../modelos/instituto.model';
import {catalogos} from '../../../../environments/catalogos';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {  
    constructor(private spinner: NgxSpinnerService, private service: ServiceService,private modalService: NgbModal) {
    }
   
  cursos: Curso; 
  cursoNuevo: Curso;
  cursoSeleccionada: Curso;
  buscador: string;
  flagPagination: boolean;
  tipos: Array<any>;
  modalidades: Array<any>;
  lugares: Array<any>;
  institutos: Array<Instituto>;  
    
   
  ngOnInit() {
    this.cursoSeleccionada = new Curso();     
    this.cursoNuevo = new Curso();      
    this.buscador = '';
    this.flagPagination = true;
    this.institutos = new Array<Instituto>(); 
    this.tipos = catalogos.tiposCursos;  
    this.modalidades = catalogos.modalidadesCursos;
    this.lugares = catalogos.lugaresCursos;
    this.getCurso();
    this.getInstitutos();
      
  }

  getCurso(): void {
    this.service.get('cursos')
      .subscribe(
        response => {          
          this.cursos = response['cursos'];  
          console.log(this.cursos);           
        },
        error => {          
        });
  }
  
  getInstitutos(): void {
    this.service.get('institutos')
      .subscribe(
        response => {
          console.log(response);
          this.institutos = response['institutos'];        
        },
        error => {          
        });
  }  

  createCurso() {
    console.log (this.cursoNuevo);
    this.spinner.show();    
    this.service.post('cursos', {'curso': this.cursoNuevo,'instituto': this.cursoNuevo.instituto}).subscribe(
      response => {
        this.getCurso();
        this.spinner.hide();        
        this.cursoNuevo = new Curso();
      },
      error => {
        this.spinner.hide();
      });
  }
  
  openCurso(content,cursos: Curso, flag:boolean) {
    console.log (flag);  
    if(flag){
      this.cursoNuevo= new Curso();
      console.log('si');
    }  else{
      this.cursoNuevo= cursos;
      console.log('no');
    }
    this.modalService.open(content)
      .result
      .then((resultModal => {
        if (resultModal === 'save') {
          if (flag) {
            console.log('create');
            this.createCurso();
          }else{
            console.log('update');
            this.updateCurso(cursos);
          }
        }       
      }), (resultCancel => {

      }));
  } 
  
  filter(event) {
    if (event.which === 13 || this.buscador.length === 0) {
      if (this.buscador.length === 0) {
        this.flagPagination = true;
        this.getCurso();
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
    this.service.get('cursos/filter' + parametros).subscribe(
      response => {     
        console.log(response);
        this.cursos = response['cursos'];   
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();        
      });
  }
 

  deleteCurso(curso) {
    swal.fire(({
     title: 'Esta usted seguro?',
     text: "Va a borrar un curso existente!",
     type: 'question',
     showCancelButton: true,
     confirmButtonColor: '#3048d6',
     cancelButtonColor: '#c44',
     confirmButtonText: 'Si, deseo borrarlo!'
   }))
       .then((result) => {
         if (result.value) {           
           this.spinner.show();
           this.service.delete('cursos?curso_id=' + curso.id).subscribe(
               response => {               
               this.getCurso();
               this.spinner.hide();               
               swal.fire(
                 'Borrado!',
                 'Usted ha borrado un curso existente.',
                 'success'
               );             
            },
             error => {
              this.spinner.hide();              
             });
         }
      });   
  }

  updateCurso(cursos: Curso): void {
    swal.fire(({
      title: 'Esta usted seguro?',
      text: "Va a actualizar un curso existente!",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#c44',
      confirmButtonText: 'Si, deseo actualizarlo!'
    }))
    .then((result) => {
      if (result.value) {  
    this.service.update('cursos',
      {'curso': cursos})
      .subscribe(
        response => { 
          swal.fire(
            'Actualizado!',
            'Usted actualizo un curso existente.',
            'success'
            );             
          }
          );
       }
    });   
}
 }