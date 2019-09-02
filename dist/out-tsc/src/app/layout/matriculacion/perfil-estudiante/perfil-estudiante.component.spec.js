import { async, TestBed } from '@angular/core/testing';
import { PerfilEstudianteComponent } from './perfil-estudiante.component';
describe('PerfilEstudianteComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PerfilEstudianteComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PerfilEstudianteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=perfil-estudiante.component.spec.js.map