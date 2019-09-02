import { Facilitador } from './facilitador.model';
import { Curso } from './curso.model';
var Asignacion = /** @class */ (function () {
    function Asignacion() {
        this.id = 0;
        this.hora_inicio = '';
        this.hora_fin = '';
        this.fecha_inicio = new Date;
        this.fecha_fin = new Date;
        this.horas_duracion = "";
        this.observacion = '';
        this.estado = '';
        this.facilitador = new Facilitador();
        this.curso = new Curso();
    }
    return Asignacion;
}());
export { Asignacion };
//# sourceMappingURL=asignacion.model.js.map