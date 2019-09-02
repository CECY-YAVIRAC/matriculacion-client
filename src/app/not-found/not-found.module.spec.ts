import { NotFoundModule } from './not-found.module';

describe('LoadingSpinnerModule', () => {
  let notFoundModule: NotFoundModule;

  beforeEach(() => {
    notFoundModule = new NotFoundModule();
  });

  it('should create an instance', () => {
    expect(notFoundModule).toBeTruthy();
  });
});
