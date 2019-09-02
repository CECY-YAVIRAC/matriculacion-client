import { ResetPasswordModule } from './reset-password.module';
describe('ResetPasswordModule', function () {
    var accessDeniedModule;
    beforeEach(function () {
        accessDeniedModule = new ResetPasswordModule();
    });
    it('should create an instance', function () {
        expect(accessDeniedModule).toBeTruthy();
    });
});
//# sourceMappingURL=reset-password.module.spec.js.map