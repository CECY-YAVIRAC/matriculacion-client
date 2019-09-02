import {Curso} from './curso.model';


export class Asignacion {
  id?: number;
  curso: Curso;
  hora_inicio: string;
  hora_fin: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  horas_duracion: string;
  valor_curso: string;
  observacion: string;
  estado: string;

  constructor() {
    this.id = 0;
    this.hora_inicio = ''; 
    this.hora_fin = ''; 
    this.fecha_inicio = new Date;
    this.fecha_fin = new Date;
    this.horas_duracion = "";
    this.valor_curso = "";
    this.observacion = ''; 
    this.estado = ''; 
    this.curso = new Curso();  

    

  }
}









