import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {User} from '../../layout/matriculacion/modelos/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
  user: User;

  constructor(private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot) {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    if (localStorage.getItem('isLoggedin') === 'true') {
      switch (route['_routerState']['url']) {
        case '/dashboard-matricula':
          if (this.user.role_id === '3' || this.user.role_id === '4') {
            return true;
          }
          break;
        case '/dashboard-cupo':
          if (this.user.role_id === '1') {
            return true;
          }
          break;
        case '/dashboard':
          if (this.user.role_id === '3' || this.user.role_id === '4') {
            return true;
          }
          break;
        case '/matricula':
          if (this.user.role_id === '3' || this.user.role_id === '4') {
            return true;
          }
          break;
        case '/cupos':
          if (this.user.role_id === '1' || this.user.role_id === '4') {
            return true;
          }
          break;
        case '/perfil-participante':
          if (this.user.role_id === '2') {          
            return true;
          }
          break;
        default:
          //this.router.navigate(['/access-denied']);
          return true;
          break;
      }
      //this.router.navigate(['/access-denied']);
      return true;
    } else {
      //this.router.navigate(['/login']);
      return true;
    }
  }
}
