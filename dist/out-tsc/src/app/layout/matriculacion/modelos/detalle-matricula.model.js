import { Matricula } from './matricula.model';
import { Curso } from './curso.model';
import { TipoMatricula } from './tipo-matricula.model';
var DetalleMatricula = /** @class */ (function () {
    function DetalleMatricula() {
        this.matricula = new Matricula();
        this.tipo_matricula = new TipoMatricula();
        this.tipo_matricula.id = 0;
        this.curso = new Curso();
        this.curso.id = 0;
        this.numero_matricula = '';
        this.jornada = '';
        this.paralelo = '';
    }
    return DetalleMatricula;
}());
export { DetalleMatricula };
//# sourceMappingURL=detalle-matricula.model.js.map