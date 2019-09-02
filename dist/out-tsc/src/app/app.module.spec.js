import { AppModule } from './app.module';
describe('AppModule', function () {
    var appModule;
    beforeEach(function () {
        appModule = new AppModule();
    });
    it('should create an instance', function () {
        expect(appModule).toBeTruthy();
    });
});
//# sourceMappingURL=app.module.spec.js.map