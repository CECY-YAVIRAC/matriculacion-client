import { async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonsComponent } from './buttons.component';
describe('ButtonsComponent', function () {
    var component;
    var fixture, type = "button", sComponent;
     > ;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                NgbModule
            ],
            declarations: [ButtonsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ButtonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=buttons.component.spec.js.map