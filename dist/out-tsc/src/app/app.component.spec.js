import { async, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
describe('AppComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=app.component.spec.js.map