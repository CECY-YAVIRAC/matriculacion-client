import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RatingComponent } from './rating.component';
import { BsComponentModule } from '../../bs-component.module';
describe('RatingComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [BsComponentModule, RouterTestingModule],
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(RatingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=rating.component.spec.js.map