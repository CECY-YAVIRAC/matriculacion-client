import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';
import { LayoutModule } from '../../layout.module';
describe('HeaderComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                LayoutModule,
                RouterTestingModule,
                TranslateModule.forRoot(),
            ],
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=header.component.spec.js.map