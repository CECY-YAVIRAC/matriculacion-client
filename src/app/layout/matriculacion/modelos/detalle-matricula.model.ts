import {Matricula} from './matricula.model';
import {Curso} from './curso.model';
import {TipoMatricula} from './tipo-matricula.model';


export class DetalleMatricula {
  id?: number;
  matricula: Matricula;
  curso: Curso;
  tipo_matricula: TipoMatricula;
  paralelo: string;
  jornada: string;
  jornada_asignatura: string;
  numero_matricula: string;
  estado: string;

  constructor() {
    this.matricula = new Matricula();
    this.tipo_matricula = new TipoMatricula();
    this.tipo_matricula.id = 0;
    this.curso = new Curso();
    this.curso.id = 0;
    this.numero_matricula = '';
    this.jornada = '';
    this.paralelo = '';
  }
}
