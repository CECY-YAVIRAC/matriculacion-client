var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, QueryList, ViewChildren } from '@angular/core';
import { ServiceService } from '../../../matriculacion/service.service';
import { Chart } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
var DashboardCupoComponent = /** @class */ (function () {
    function DashboardCupoComponent(spinner, service) {
        this.spinner = spinner;
        this.service = service;
        this.chart = [];
    }
    DashboardCupoComponent.prototype.ngOnInit = function () {
        this.flagGraficos = true;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.total_matriculados_carreras_count = new Array();
        this.total_matriculados_institutos_count = new Array();
        this.getMatriculadosCount();
    };
    DashboardCupoComponent.prototype.getMatriculadosCount = function () {
        var _this = this;
        this.flagGraficos = !this.flagGraficos;
        this.spinner.show();
        this.service.get('matriculas/count?id=' + this.user.id)
            .subscribe(function (response) {
            _this.total_matriculados_carreras_count = response['matriculados_carreras_count'];
            _this.total_matriculados_institutos_count = response['matriculados_institutos_count'];
            _this.spinner.hide();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    DashboardCupoComponent.prototype.drawMatriculasCount = function (matriculados) {
        var _this = this;
        this.total_matriculados_carreras_count.forEach(function (value) {
            _this.chart = new Chart('carrera_' + value.carrera_id.toString(), {
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
            });
        });
        this.total_matriculados_institutos_count.forEach(function (value) {
            _this.chart = new Chart('instituto_' + value.instituto_id.toString(), {
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
            });
        });
    };
    // tslint:disable-next-line:use-life-cycle-interface
    DashboardCupoComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.graficosInstitutos.changes.subscribe(function (value) {
            if (_this.flagGraficos) {
                _this.drawMatriculasCount(_this.total_matriculados_carreras_count);
            }
        });
        this.graficosCarreras.changes.subscribe(function (value) {
            if (_this.flagGraficos) {
                _this.drawMatriculasCount(_this.total_matriculados_carreras_count);
            }
        });
    };
    __decorate([
        ViewChildren('graficosCarreras'),
        __metadata("design:type", QueryList)
    ], DashboardCupoComponent.prototype, "graficosCarreras", void 0);
    __decorate([
        ViewChildren('graficosInstitutos'),
        __metadata("design:type", QueryList)
    ], DashboardCupoComponent.prototype, "graficosInstitutos", void 0);
    DashboardCupoComponent = __decorate([
        Component({
            selector: 'app-dashboard-cupo',
            templateUrl: './dashboard-cupo.component.html',
            styleUrls: ['./dashboard-cupo.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService])
    ], DashboardCupoComponent);
    return DashboardCupoComponent;
}());
export { DashboardCupoComponent };
//# sourceMappingURL=dashboard-cupo.component.js.map