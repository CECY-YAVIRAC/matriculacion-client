import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsComponent } from './charts.component';
import { ChartsModule } from './charts.module';
describe('ChartsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                ChartsModule,
                RouterTestingModule,
                BrowserAnimationsModule,
            ],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ChartsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=charts.component.spec.js.map