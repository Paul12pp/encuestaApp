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

export interface IProvincia {
    label: string;
    nombre: string;
    municipios: string[];
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
    id: number;
    nombre: string;
    direccion: string;
}
export interface Parentesco {
    id: number;
    description: string;
}
export interface Curso{
    id: number;
    description: string;
}

export interface Pregunta {
    description: string;
    id: number;
    encuestaId: number;
    isTabla: boolean;
    tipos: string;
    opciones: Opcion[];
}
export interface Opcion {
    description: string;
    id: number;
    preguntaId: number;
}
export interface Visita{
    userId:number,
    fecha:string;
}
export interface All{
    SoloVisita:Visita[], 
    Visita: Respuesta[] 
}