import { async, TestBed } from '@angular/core/testing';
import { StatComponent } from './stat.component';
describe('StatComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [StatComponent]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(StatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=stat.component.spec.js.map