import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './sidebar.component';
import { LayoutModule } from '../../layout.module';
describe('SidebarComponent', function () {
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
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=sidebar.component.spec.js.map