import { async, TestBed } from '@angular/core/testing';
import { AccessDeniedComponent } from './access-denied.component';
describe('ResetPasswordComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AccessDeniedComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AccessDeniedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=access-denied.component.spec.js.map