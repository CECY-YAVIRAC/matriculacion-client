import { AccessDeniedModule } from './access-denied.module';
describe('ResetPasswordModule', function () {
    var accessDeniedModule;
    beforeEach(function () {
        accessDeniedModule = new AccessDeniedModule();
    });
    it('should create an instance', function () {
        expect(accessDeniedModule).toBeTruthy();
    });
});
//# sourceMappingURL=access-denied.module.spec.js.map