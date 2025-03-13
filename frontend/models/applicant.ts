export interface Applicant {
    cedula: string;
    nombre: string;
    apellido: string;
    ocupacion: string;
    meses_trabajando: number;
    salario_mensual: number;
    fecha_nacimiento: string;
    deuda_total: number;
    cuota_mensual_total: number;
    tipoDocumento: string; 
    score_credito: number;
    edad: number;
    delay_from_due_date: number;
    balance_mensual: number;
}