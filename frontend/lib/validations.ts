import { Applicant } from "@/models/applicant";

export const validateApplicant = (applicant: Applicant): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!applicant.nombre) errors.nombre = "El nombre es obligatorio.";
  if (!applicant.apellido) errors.apellido = "Los apellidos son obligatorios.";
  if (!applicant.ocupacion) errors.ocupacion = "La ocupación es obligatoria.";
  if (!applicant.cedula) errors.cedula = "El número de documento es obligatorio.";
  if (!applicant.salario_mensual || applicant.salario_mensual <= 0) errors.salario_mensual = "El salario mensual debe ser mayor a 0.";
  if (!applicant.meses_trabajando || applicant.meses_trabajando < 0) errors.meses_trabajando = "Los meses de trabajo no pueden ser negativos.";
  if (!applicant.fecha_nacimiento) errors.fecha_nacimiento = "Debe ingresar la fecha de nacimiento.";
  if (!applicant.deuda_total || applicant.deuda_total < 0) errors.deuda_total = "Debe ingresar la deuda total.";
  if (!applicant.cuota_mensual_total || applicant.cuota_mensual_total < 0) errors.cuota_mensual_total = "Debe ingresar la cuota mensual total.";

  return errors;
};
