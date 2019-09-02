import { Ubicacion } from './ubicacion.model';
var Estudiante = /** @class */ (function () {
    function Estudiante() {
        this.tipo_identificacion = '';
        this.sexo = '';
        this.etnia = '';
        this.tipo_sangre = '';
        this.tipo_bachillerato = '';
        this.tipo_colegio = '';
        this.pueblo_nacionalidad = '';
        this.tipo_bachillerato = '';
        this.tipo_colegio = '';
        this.pais_nacionalidad = new Ubicacion();
        this.provincia_nacimiento = new Ubicacion();
        this.canton_nacimiento = new Ubicacion();
        this.pais_residencia = new Ubicacion();
        this.anio_graduacion = '';
        this.genero = '';
        this.fecha_nacimiento = new Date();
        this.fecha_inicio_carrera = new Date();
    }
    return Estudiante;
}());
export { Estudiante };
//# sourceMappingURL=estudiante.model.js.map