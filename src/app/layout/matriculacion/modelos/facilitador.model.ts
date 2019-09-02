import {User} from './user.model';

export class Facilitador {
  id?: number;
  user: User;
  cedula: string;
  apellido1: string;
  apellido2: string;
  nombre1: string;
  nombre2: string;
  fecha_nacimiento: Date;
  correo_electronico: string;
  capacitaciones: string;
  titulo: string;
  estado: string;
 
  constructor() {
    this.id = 0;
    this.cedula = '';
    this.apellido1 = '';
    this.apellido2 = '';
    this.nombre1 = '';
    this.nombre2 = '';
    this.fecha_nacimiento = new Date;
    this.correo_electronico = '';
    this.capacitaciones = '';
    this.titulo = '';
    this.estado = '';
    this.user = new User();
  }
}
