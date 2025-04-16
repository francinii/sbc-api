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
	monthly_inhand_salary: number;
	outstanding_debt: number;
	num_credit_cards: number;
	payment_of_min_amount: string; // "Yes" o "No"
	monto_inversion_mensual: number;
	experiencia_crediticia: number;
	cantidad_prestamos_activos: number;
  }
  