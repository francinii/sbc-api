/** Formatea la cédula automáticamente en formato `#-####-####` */
export const formatCedula = (value: string) => {
    let formatted = value.replace(/\D/g, "").slice(0, 9);
    if (formatted.length >= 5) return `${formatted.slice(0, 1)}-${formatted.slice(1, 5)}-${formatted.slice(5)}`;
    if (formatted.length >= 2) return `${formatted.slice(0, 1)}-${formatted.slice(1)}`;
    return formatted;
};

/** Permite solo caracteres alfanuméricos y limita a 15 caracteres */
export const formatPasaporte = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);
  