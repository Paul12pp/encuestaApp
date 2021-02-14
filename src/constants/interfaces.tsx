export interface Login {
    email: string;
    password: string;
}
export interface Data {
    nombre: string;
    direccion: string;
    telefono: string;
    coordenadas: string;
    DireccionGPSOpcional?: string;
    ParentescoId: number;
    UserId: number;
    EncuestaId: number;
    Estudiantes: Estudiante[];
    respuestas: Respuesta[];
}
export interface Respuesta {
    preguntaId: number;
    respuestaId: number;
}
export interface Estudiante {
    cursoId: number;
    Edad: number;
    Escuela: string;
}
export interface Escuela{

    Id: number;
    Nombre: string;
    Direccion: string;
}
export interface Parentesco {
    Id: number;
    Description: string;
}
export interface Curso{
    id: number;
    Description: string;
}

export interface Pregunta {
    Description: string;
    Id: number;
    EncuestaId: number;
    isTabla: boolean;
    opciones: Opcion[];
}
export interface Opcion {
    Description: string;
    Id: number;
    PreguntaId: number;
}
export interface Visita{
    userId:number,
    fecha:string;
}