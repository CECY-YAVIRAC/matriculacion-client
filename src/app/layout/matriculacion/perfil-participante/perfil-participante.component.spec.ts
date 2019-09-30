import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilParticipanteComponent } from './perfil-participante.component';

describe('PerfilParticipanteComponent', () => {
    let component: PerfilParticipanteComponent;
    let fixture: ComponentFixture<PerfilParticipanteComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [PerfilParticipanteComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PerfilParticipanteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
