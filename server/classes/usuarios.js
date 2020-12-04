class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0];
        // Se pone la posicion 0 ya que el filter me devuelve un arreglo
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }

    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        // Aca estoy guardando el arreglo que me devuelve el filter para
        // que sea mi nuevo arreglo de las personas
        this.personas = this.personas.filter(persona => persona.id != id);
        return personaBorrada;
    }

}


module.exports = {
    Usuarios
}