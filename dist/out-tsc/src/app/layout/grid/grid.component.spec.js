import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridComponent } from './grid.component';
import { GridModule } from './grid.module';
describe('GridComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                GridModule,
                RouterTestingModule,
                BrowserAnimationsModule,
            ],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(GridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=grid.component.spec.js.map