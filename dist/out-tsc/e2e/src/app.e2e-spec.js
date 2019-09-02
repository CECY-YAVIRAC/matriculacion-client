import { AppPage } from './app.po';
describe('test-ng7 App', function () {
    var page;
    beforeEach(function () {
        page = new AppPage();
    });
    it('should display welcome message', function () {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('SB Admin BS4 Angular7');
    });
});
//# sourceMappingURL=app.e2e-spec.js.map