import {Matricula} from './matricula.model';


export class InformacionParticipante {

  id?: number;
  matricula: Matricula;
  condicion_curso: string;
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
    this.condicion_curso = '';
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
    this.cursos_seguir= '';  
    this.estado = '';  
    this.matricula = new Matricula();

  }

}


