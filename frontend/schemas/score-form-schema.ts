import { z } from "zod";

export const ocupacionesEnum = [
  "Accountant",
  "Architect",
  "Developer",
  "Doctor",
  "Engineer",
  "Entrepreneur",
  "Journalist",
  "Lawyer",
  "Manager",
  "Mechanic",
  "Media_Manager",
  "Musician",
  "Scientist",
  "Teacher",
  "Writer",
] as const;

const nonNegativeField = z.preprocess(
  (val) => (typeof val === "string" ? Number(val) : val),
  z.number().min(0, { message: "Debe ser un número mayor o igual a 0." })
);

const positiveField = z.preprocess(
  (val) => (typeof val === "string" ? Number(val) : val),
  z.number().positive({ message: "Debe ser un número mayor a 0." })
);

const minBirthDate = new Date();
minBirthDate.setFullYear(minBirthDate.getFullYear() - 10);

export const ScoreFormSchema = z.object({
  tipoDocumento: z.enum(["cedula", "pasaporte"], { message: "Debe seleccionar un tipo de documento." }),
  cedula: z.string().min(9, { message: "Debe ingresar un número de documento válido." }),
  nombre: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  apellido: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
  ocupacion: z.enum(ocupacionesEnum, { message: "Debe seleccionar una ocupación válida." }),

  meses_trabajando: nonNegativeField,
  salario_mensual: positiveField,
  deuda_total: nonNegativeField,
  cuota_mensual_total: nonNegativeField,
  delay_from_due_date: nonNegativeField,
  balance_mensual: nonNegativeField,

  monthly_inhand_salary: positiveField,
  outstanding_debt: nonNegativeField,
  num_credit_cards: nonNegativeField,
  payment_of_min_amount: z.enum(["Yes", "No"], { message: "Debe indicar si paga el monto mínimo." }),
  monto_inversion_mensual: nonNegativeField,
  experiencia_crediticia: nonNegativeField,
  cantidad_prestamos_activos: nonNegativeField,

  fecha_nacimiento: z.date().refine(
    (date) => date <= minBirthDate,
    { message: "Debe tener al menos 10 años de edad." }
  )
});
