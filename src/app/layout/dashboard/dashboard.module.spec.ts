import { DashboardModule } from './dashboard.module';

describe('DashboardMatriculaModule', () => {
  let dashboardModule: DashboardModule;

  beforeEach(() => {
    dashboardModule = new DashboardModule();
  });

  it('should create an instance', () => {
    expect(dashboardModule).toBeTruthy();
  });
});
