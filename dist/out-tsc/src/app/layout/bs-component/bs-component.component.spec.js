import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BsComponentComponent } from './bs-component.component';
import { BsComponentModule } from './bs-component.module';
describe('BsComponentComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [BsComponentModule, RouterTestingModule],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(BsComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=bs-component.component.spec.js.map