export class Question {
    id?: string;
    titulo: string;
    descripcion: string;
    categoria: string;
    usuario: string;
    views: number;
    comments: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;

    constructor(titulo:string,descripcion: string,categoria: string, usuario:string, fechaCreacion: Date, fechaActualizacion: Date) {
        
        this.id = this.uuidv4();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.usuario = usuario;
        this.views = 0;
        this.comments = 0;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }

    uuidv4(): string {
        return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
        /[018]/g,
        (c: number) =>
            (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
            ).toString(16)
        );
    }
}