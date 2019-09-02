import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {ServiceService} from '../matriculacion/service.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Matricula} from '../matriculacion/modelos/matricula.model';
import {Carrera} from '../matriculacion/modelos/carrera.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../matriculacion/modelos/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  total_matriculados_count: Array<any>;
  user: User;

  constructor(private spinner: NgxSpinnerService, private service: ServiceService) {


  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.total_matriculados_count = new Array<Matricula>();
    this.getMatriculadosCount();
  }

  getMatriculadosCount() {
    this.spinner.show();
    this.service.get('matriculas/count')
      .subscribe(
        response => {
          this.total_matriculados_count = response['matriculados_count'];
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
        });
  }

}
