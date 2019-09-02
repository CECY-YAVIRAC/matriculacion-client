import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form.component';
import { FormModule } from './form.module';
describe('FormComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                FormModule,
                BrowserAnimationsModule,
                RouterTestingModule,
            ],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=form.component.spec.js.map