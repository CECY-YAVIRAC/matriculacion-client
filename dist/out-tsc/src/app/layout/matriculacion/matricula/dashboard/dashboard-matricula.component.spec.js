import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardMatriculaComponent } from './dashboard-matricula.component';
import { DashboardMatriculaModule } from './dashboard-matricula.module';
describe('DashboardCupoComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                DashboardMatriculaModule,
                RouterTestingModule,
                BrowserAnimationsModule,
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DashboardMatriculaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=dashboard-matricula.component.spec.js.map