import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardCupoComponent } from './dashboard-cupo.component';
import { DashboardMatriculaModule } from './dashboard-cupo.module';
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
        fixture = TestBed.createComponent(DashboardCupoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=dashboard-cupo.component.spec.js.map