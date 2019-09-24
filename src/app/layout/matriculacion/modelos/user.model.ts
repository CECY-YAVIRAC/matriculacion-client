import {Rol} from './rol.model';
import { Identifiers } from '@angular/compiler';

export class User {
  id?: number;
  role: Rol;
  role_id: string;
  user_name: string;
  name: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  estado: string;


  constructor() {
    this.id = 0;
    this.role_id = '';
    this.user_name = '';
    this.name = '';
    this.email = '';
    this.nombre = '';
    this.apellido = '';
    this.password = '';
    this.estado = '';
    this.role = new Rol();
  }
}
