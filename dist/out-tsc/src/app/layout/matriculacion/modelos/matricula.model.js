import { Participante } from './participante.model';
import { Asignacion } from './asignacion.model';
import { TipoMatricula } from './tipo-matricula.model';
var Matricula = /** @class */ (function () {
    function Matricula() {
        this.id = 0;
        this.codigo = '';
        this.fecha = new Date();
        this.paralelo = '';
        this.numero_matricula = '';
        this.curso = '';
        this.horario = '';
        this.carrera = '';
        this.condicion_academica = '';
        this.nivel = '';
        this.direccion = '';
        this.telefono_celular = '';
        this.telefono_fijo = '';
        this.correo_electronico = '';
        this.instruccion_academica = '';
        this.economicamente_activo = '';
        this.empresa_trabajo = '';
        this.empresa_direccion = '';
        this.correo_empresa = '';
        this.telefono_empresa = '';
        this.actividad_empresa = '';
        this.curso_auspicio = '';
        this.nombre_contacto = '';
        this.averiguo_curso = '';
        this.cursos_seguir = '';
        this.estado = '';
        this.participante = new Participante();
        this.asignacion = new Asignacion();
        this.tipo_matricula = new TipoMatricula();
    }
    return Matricula;
}());
export { Matricula };
//# sourceMappingURL=matricula.model.js.map