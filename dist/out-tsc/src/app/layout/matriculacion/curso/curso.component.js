var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Curso } from '../modelos/curso.model';
import { catalogos } from '../../../../environments/catalogos';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
var CursoComponent = /** @class */ (function () {
    function CursoComponent(spinner, service, modalService) {
        this.spinner = spinner;
        this.service = service;
        this.modalService = modalService;
    }
    CursoComponent.prototype.ngOnInit = function () {
        this.institutos = new Array();
        this.cursoSeleccionada = new Curso();
        this.cursoNuevo = new Curso();
        this.buscador = '';
        this.flagPagination = true;
        this.tipos = catalogos.tiposCursos;
        this.modalidades = catalogos.modalidadesCursos;
        this.lugares = catalogos.lugaresCursos;
        this.getCurso();
        this.getInstitutos();
    };
    CursoComponent.prototype.getCurso = function () {
        var _this = this;
        this.service.get('cursos')
            .subscribe(function (response) {
            _this.cursos = response['cursos'];
        }, function (error) {
        });
    };
    CursoComponent.prototype.getInstitutos = function () {
        var _this = this;
        this.service.get('institutos')
            .subscribe(function (response) {
            console.log(response);
            _this.institutos = response['institutos'];
        }, function (error) {
        });
    };
    CursoComponent.prototype.createCurso = function () {
        var _this = this;
        console.log(this.cursoNuevo);
        this.spinner.show();
        this.service.post('cursos', { 'curso': this.cursoNuevo }).subscribe(function (response) {
            _this.getCurso();
            _this.spinner.hide();
            _this.cursoNuevo = new Curso();
        }, function (error) {
            _this.spinner.hide();
        });
    };
    CursoComponent.prototype.openCurso = function (content, curso, flag) {
        var _this = this;
        console.log(flag);
        if (flag) {
            this.cursoNuevo = new Curso();
            console.log('si');
        }
        else {
            this.cursoNuevo = curso;
            console.log('no');
        }
        this.modalService.open(content)
            .result
            .then((function (resultModal) {
            if (resultModal === 'save') {
                if (flag) {
                    console.log('create');
                    _this.createCurso();
                }
                else {
                    console.log('update');
                    _this.updateCurso(curso);
                }
            }
        }), (function (resultCancel) {
        }));
    };
    CursoComponent.prototype.filter = function (event) {
        if (event.which === 13 || this.buscador.length === 0) {
            if (this.buscador.length === 0) {
                this.flagPagination = true;
                this.getCurso();
            }
            else {
                this.flagPagination = false;
                this.getCurso();
            }
        }
    };
    CursoComponent.prototype.deleteCurso = function (curso) {
        var _this = this;
        swal.fire(({
            title: 'Esta usted seguro?',
            text: "Va a borrar un curso existente!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3048d6',
            cancelButtonColor: '#c44',
            confirmButtonText: 'Si, deseo borrarlo!'
        }))
            .then(function (result) {
            if (result.value) {
                _this.spinner.show();
                _this.service.delete('cursos?curso_id=' + curso.id).subscribe(function (response) {
                    _this.getCurso();
                    _this.spinner.hide();
                    swal.fire('Borrado!', 'Usted ha borrado un curso existente.', 'success');
                }, function (error) {
                    _this.spinner.hide();
                });
            }
        });
    };
    CursoComponent.prototype.updateCurso = function (curso) {
        var _this = this;
        swal.fire(({
            title: 'Esta usted seguro?',
            text: "Va a actualizar un curso existente!",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#c44',
            confirmButtonText: 'Si, deseo actualizarlo!'
        }))
            .then(function (result) {
            if (result.value) {
                _this.service.update('cursos', { 'curso': curso })
                    .subscribe(function (response) {
                    swal.fire('Actualizado!', 'Usted actualizo un curso existente.', 'success');
                });
            }
        });
    };
    CursoComponent = __decorate([
        Component({
            selector: 'app-curso',
            templateUrl: './curso.component.html',
            styleUrls: ['./curso.component.scss']
        }),
        __metadata("design:paramtypes", [NgxSpinnerService, ServiceService, NgbModal])
    ], CursoComponent);
    return CursoComponent;
}());
export { CursoComponent };
//# sourceMappingURL=curso.component.js.map