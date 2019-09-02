import { async, TestBed } from '@angular/core/testing';
import { PerfilParticipanteComponent } from './perfil-participante.component';
describe('PerfilParticipanteComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [PerfilParticipanteComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PerfilParticipanteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=perfil-participante.component.spec.js.map