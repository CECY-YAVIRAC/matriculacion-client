import {Participante} from './participante.model';
import {Asignacion} from './asignacion.model';
import {TipoMatricula} from './tipo-matricula.model';
import {TipoDescuento} from './tipo-descuento.model';

export class Matricula {
  id?: number;
  participante: Participante;
  asignacion: Asignacion;
  asignacion_id: number;
  tipo_matricula: TipoMatricula;
  tipo_descuento: TipoDescuento;
  codigo: string;
  fecha: Date;
  paralelo: string;
  numero_matricula: string; 
  estado_academico: string;
  valor_total: string;
  valor_descuento: string;
  nota: string;  
  carrera: string;
  nivel: string;  
  condicion_academica: string;         
  direccion: string;
  telefono_celular: string;
  telefono_fijo: string;
  correo_electronico: string;
  instruccion_academica: string;
  economicamente_activo: string;
  empresa_trabajo: string;            
  empresa_direccion: string;
  correo_empresa: string;
  telefono_empresa: string;
  actividad_empresa: string;             
  curso_auspicio: string;
  nombre_contacto: string;
  averiguo_curso: string;
  cursos_seguir: string;
  estado: string;

  constructor() {
    this.id = 0;
    this.codigo = '';
    this.fecha = new Date();
    this.paralelo = '';
    this.numero_matricula = '';
    this.estado_academico = '';
    this.valor_total = '';
    this.valor_descuento = '';
    this.nota = '';
    this.carrera = '';
    this.nivel = '';
    this.condicion_academica = '';
    this.direccion = '';
    this.telefono_celular = '';
    this.telefono_fijo = '';
    this.correo_electronico = '';
    this.instruccion_academica = '';
    this.economicamente_activo = '';
    this.empresa_trabajo = '';            
    this.empresa_direccion = '';
    this.correo_empresa = '';
    this.telefono_empresa = '';
    this.actividad_empresa = '';             
    this.curso_auspicio = '';
    this.nombre_contacto = '';
    this.averiguo_curso = '';
    this.cursos_seguir = '';
    this.estado = '';
    this.asignacion_id = 0;
    this.participante = new Participante();
    this.asignacion = new Asignacion();
    this.tipo_matricula = new TipoMatricula();
    this.tipo_descuento = new TipoDescuento();
  }
}


