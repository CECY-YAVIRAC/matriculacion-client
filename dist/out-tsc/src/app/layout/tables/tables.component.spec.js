import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TablesComponent } from './tables.component';
import { TablesModule } from './tables.module';
describe('TablesComponent', function () {
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [TablesModule, RouterTestingModule],
        })
            .compileComponents();
    }));
    it('should create', function () {
        var fixture = TestBed.createComponent(TablesComponent);
        var component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=tables.component.spec.js.map