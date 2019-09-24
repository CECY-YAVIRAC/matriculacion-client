var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared/guard';
var routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard-matricula',
                loadChildren: './matriculacion/matricula/dashboard/dashboard-matricula.module#DashboardMatriculaModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'dashboard-cupo',
                loadChildren: './matriculacion/cupo/dashboard/dashboard-cupo.module#DashboardCupoModule',
                canActivate: [AuthGuard]
            },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule', canActivate: [AuthGuard] },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule', canActivate: [AuthGuard] },
            { path: 'forms', loadChildren: './form/form.module#FormModule', canActivate: [AuthGuard] },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule', canActivate: [AuthGuard] },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule', canActivate: [AuthGuard] },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule', canActivate: [AuthGuard] },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule', canActivate: [AuthGuard] },
           /*  {
                path: 'perfil-estudiante',
                loadChildren: './matriculacion/perfil-estudiante/perfil-estudiante.module#PerfilEstudianteModule',
                canActivate: [AuthGuard]
            }, */
            {
                path: 'perfil-participante',
                loadChildren: './matriculacion/perfil-participante/perfil-participante.module#PerfilParticipanteModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'matricula', loadChildren: './matriculacion/matricula/matricula.module#MatriculaModule', canActivate: [AuthGuard]
            },
            {
                path: 'cupos', loadChildren: './matriculacion/cupo/cupo.module#CupoModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'curso',
                loadChildren: './matriculacion/curso/curso.module#CursoModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'facilitador',
                loadChildren: './matriculacion/facilitador/facilitador.module#FacilitadorModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'asignacion',
                loadChildren: './matriculacion/asignacion/asignacion.module#AsignacionModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'horario',
                loadChildren: './matriculacion/horario/horario.module#HorarioModule',
                canActivate: [AuthGuard]
            },
            { path: 'estudiantes', loadChildren: './matriculacion/estudiante/estudiante.module#EstudianteModule', canActivate: [AuthGuard] },
        ]
    }
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());
export { LayoutRoutingModule };
//# sourceMappingURL=layout-routing.module.js.map