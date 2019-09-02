import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ServiceService} from '../../../matriculacion/service.service';
import {Chart} from 'chart.js';
import {NgxSpinnerService} from 'ngx-spinner';
import {User} from '../../../matriculacion/modelos/user.model';

@Component({
  selector: 'app-dashboard-cupo',
  templateUrl: './dashboard-cupo.component.html',
  styleUrls: ['./dashboard-cupo.component.scss']
})
export class DashboardCupoComponent implements OnInit {
  total_matriculados_carreras_count: Array<any>;
  total_matriculados_institutos_count: Array<any>;
  user: User;
  chart = [];
  etiquetaCanvas: Array<any>;
  flagGraficos: boolean;
  @ViewChildren('graficosCarreras') graficosCarreras: QueryList<any>;
  @ViewChildren('graficosInstitutos') graficosInstitutos: QueryList<any>;

  constructor(private spinner: NgxSpinnerService, private service: ServiceService) {
  }

  ngOnInit() {
    this.flagGraficos = true;
    this.user = JSON.parse(localStorage.getItem('user')) as User;
    this.total_matriculados_carreras_count = new Array<any>();
    this.total_matriculados_institutos_count = new Array<any>();
    this.getMatriculadosCount();
  }

  getMatriculadosCount() {
    this.flagGraficos = !this.flagGraficos;
    this.spinner.show();
    this.service.get('matriculas/count?id=' + this.user.id)
      .subscribe(
        response => {
          this.total_matriculados_carreras_count = response['matriculados_carreras_count'];
          this.total_matriculados_institutos_count = response['matriculados_institutos_count'];
          this.spinner.hide();
        },
        error => {
          this.spinner.hide();
        });
  }

  drawMatriculasCount(matriculados: Array<any>) {
    this.total_matriculados_carreras_count.forEach(value => {
      this.chart = new Chart('carrera_' + value.carrera_id.toString(), {
          type: 'bar',
          data: {
            labels: ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto'],
            series: ['Matriculados', 'Aprobados'],
            datasets: [{
              label: 'Matriculados',
              data: [value.matriculados_1, value.matriculados_2, value.matriculados_3, value.matriculados_4, value.matriculados_5,
                value.matriculados_6],
              fill: false,
              lineTension: 0.2,
              backgroundColor: ['#5cb85c', '#5cb85c', '#5cb85c', '#5cb85c', '#5cb85c', '#5cb85c'],
              borderWidth: 2,
            },
              {
                label: 'Aprobados',
                data: [value.aprobados_1, value.aprobados_2, value.aprobados_3, value.aprobados_4, value.aprobados_5, value.aprobados_6],
                fill: false,
                lineTension: 0.2,
                backgroundColor: ['#ffc107', '#ffc107 ', '#ffc107', '#ffc107', '#ffc107', '#ffc107'],
                borderWidth: 2,
              },
              {
                label: 'En Proceso',
                data: [value.en_proceso_1, value.en_proceso_2, value.en_proceso_3, value.en_proceso_4, value.en_proceso_5,
                  value.en_proceso_6],
                fill: false,
                lineTension: 0.2,
                backgroundColor: ['#dc3545', '#dc3545', '#dc3545', '#dc3545', '#dc3545', '#dc3545'],
                borderWidth: 2,
              }]
          },
          options: {
            title: {
              text: value.malla,
              display: true,
            }
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      );
    });
    this.total_matriculados_institutos_count.forEach(value => {
      this.chart = new Chart('instituto_' + value.instituto_id.toString(), {
          type: 'bar',
          data: {
            labels: ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto'],
            datasets: [{
              label: 'Matriculados',
              data: [value.total_matriculados],
              fill: false,
              lineTension: 0.2,
              backgroundColor: ['#5cb85c', '#5cb85c', '#5cb85c', '#5cb85c', '#5cb85c', '#5cb85c'],
              borderWidth: 2,
            },
              {
                label: 'Aprobados',
                data: [value.total_aprobados],
                fill: false,
                lineTension: 0.2,
                backgroundColor: ['#ffc107', '#ffc107 ', '#ffc107', '#ffc107', '#ffc107', '#ffc107'],
                borderWidth: 2,
              },
              {
                label: 'En Proceso',
                data: [value.total_en_proceso],
                fill: false,
                lineTension: 0.2,
                backgroundColor: ['#dc3545', '#dc3545', '#dc3545', '#dc3545', '#dc3545', '#dc3545'],
                borderWidth: 2,
              }]
          },
          options: {
            title: {
              text: value.instituto,
              display: true,
            }
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      );
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.graficosInstitutos.changes.subscribe(value => {
      if (this.flagGraficos) {
        this.drawMatriculasCount(this.total_matriculados_carreras_count);
      }
    });

    this.graficosCarreras.changes.subscribe(value => {
      if (this.flagGraficos) {
        this.drawMatriculasCount(this.total_matriculados_carreras_count);
      }
    });
  }
}
