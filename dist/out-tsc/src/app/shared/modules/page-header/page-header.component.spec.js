import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageHeaderComponent } from './page-header.component';
import { PageHeaderModule } from './page-header.module';
describe('PageHeaderComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [PageHeaderModule, RouterTestingModule],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(PageHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=page-header.component.spec.js.map