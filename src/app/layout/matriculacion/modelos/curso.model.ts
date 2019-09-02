import {Instituto} from './instituto.model';

export class Curso {
  id?: number;
  instituto: Instituto; 
  codigo: string;
  nombre: string;
  tipo: string;
  modalidad: string;
  duracion: string;
  lugar: string;
  lugar_otros: string; 
  estado: string;

  
  constructor() {
    this.id = 0;    
    this.codigo = '';  
    this.nombre = '';
    this.tipo = ''; 
    this.modalidad = '';     
    this.duracion = '';    
    this.lugar = '';
    this.lugar_otros = '';     
    this.estado = ''; 
    this.instituto = new Instituto();        
  }
}






