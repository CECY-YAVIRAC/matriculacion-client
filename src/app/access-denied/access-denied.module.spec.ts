import { AccessDeniedModule } from './access-denied.module';

describe('ResetPasswordModule', () => {
  let accessDeniedModule: AccessDeniedModule;

  beforeEach(() => {
    accessDeniedModule = new AccessDeniedModule();
  });

  it('should create an instance', () => {
    expect(accessDeniedModule).toBeTruthy();
  });
});
