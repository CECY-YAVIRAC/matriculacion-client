import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { LoginModule } from './login.module';
describe('LoginComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                LoginModule,
                RouterTestingModule,
                BrowserAnimationsModule,
            ],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=login.component.spec.js.map