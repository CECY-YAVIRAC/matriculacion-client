import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup.component';
import { SignupModule } from './signup.module';
describe('SignupComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                SignupModule,
                RouterTestingModule,
                BrowserAnimationsModule,
            ],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=signup.component.spec.js.map