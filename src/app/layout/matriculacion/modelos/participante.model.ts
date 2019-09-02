import {User} from './user.model';

export class Participante {
  id?: number;
  user: User;  
  tipo_identificacion: string;
  identificacion: string;
  apellido1: string;
  apellido2: string;
  nombre1: string;
  nombre2: string;
  genero: string;
  etnia: string;  
  fecha_nacimiento: Date;
  estado: string;

  constructor() {

    this.id = 0;
    this.tipo_identificacion = '';
    this.identificacion = '';
    this.apellido1 = '';
    this.apellido2 = '';
    this.nombre1 = '';
    this.nombre2 = '';
    this.genero = '';
    this.etnia = '';
    this.fecha_nacimiento = new Date;  
    this.estado = '';
    this.user = new User();
   

  }
}



