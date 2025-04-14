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

export interface ApplicantV2 {
	cedula: string;
	nombre: string;
	apellido: string;
	tipoDocumento: string;
	fecha_nacimiento: string;
	edad: number; // calculado
	salario_mensual: number; // Salario neto USD, después de los rebajos
  saldo_deuda_pendiente: number; // total pendiente USD
  cantidad_tarjetas_credito: number;
  paga_monto_mínimo: boolean; // (Cómo paga la tarjetas, booleano)
	monto_inversion_mensual: number; // USD Cuanto invierte por mes
	fecha_experiencia_crediticia: string;
	experiencia_crediticia: number; // (En meses) Calculado de la fecha 
	                               // inició a usar tarjetas de crédito.
	cantidad_prestamos_activos: number;
	delay_from_due_date: number; // Cantidad de días
	balance_mensual: number; // USD
	score_credito: number;

	//----- Estos ya no -----
	// deuda_total: number;
	// meses_trabajando
	// cuota_mensual_total: number;
}
