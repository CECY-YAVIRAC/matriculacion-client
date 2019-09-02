import { User } from './user.model';
var Participante = /** @class */ (function () {
    function Participante() {
        this.id = 0;
        this.tipo_identificacion = '';
        this.identificacion = '';
        this.apellido1 = '';
        this.apellido2 = '';
        this.nombre1 = '';
        this.nombre2 = '';
        this.genero = '';
        this.etnia = '';
        this.fecha_nacimiento = new Date;
        this.estado = '';
        this.user = new User();
    }
    return Participante;
}());
export { Participante };
//# sourceMappingURL=participante.model.js.map