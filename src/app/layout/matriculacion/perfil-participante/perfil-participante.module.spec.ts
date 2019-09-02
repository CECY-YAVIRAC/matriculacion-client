import { PerfilParticipanteModule } from './perfil-participante.module';

describe('BlankPageModule', () => {
    let blankPageModule: PerfilParticipanteModule;

    beforeEach(() => {
        blankPageModule = new PerfilParticipanteModule();
    });

    it('should create an instance', () => {
        expect(blankPageModule).toBeTruthy();
    });
});
