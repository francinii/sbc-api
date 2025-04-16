"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { submitApplicantData } from "@/lib/api";
import { Applicant } from "@/models/applicant";
import { ScoreFormSchema } from "@/schemas/score-form-schema";
import TipoDocumentoField from "@/components/form-fields/TipoDocumentoField";
import FechaNacimientoField from "@/components/form-fields/FechaNacimientoField";
import OcupacionField from "@/components/form-fields/OcupacionField";

interface ScoreFormProps {
  form: UseFormReturn<z.infer<typeof ScoreFormSchema>>;
  onCalculate: (sbc_model: any, score_crediticio: any, graphics?: any) => void;
}

export default function ScoreForm({ form, onCalculate }: ScoreFormProps) {

  const calcularEdad = (fechaNacimiento: string): number => {
    const fecha = new Date(fechaNacimiento.split("-").reverse().join("-"));
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }
    return edad;
  };

  async function onSubmit(values: z.infer<typeof ScoreFormSchema>) {
    try {
      const applicant: Applicant = {
        ...values,
        cedula: values.tipoDocumento === "cedula" ? values.cedula.replace(/-/g, "") : values.cedula,
        fecha_nacimiento: format(values.fecha_nacimiento, "dd-MM-yyyy"),
        edad: calcularEdad(format(values.fecha_nacimiento, "dd-MM-yyyy")),
        score_credito: 0
      };

      const result = await submitApplicantData(applicant);

      const validGraphics = result.graphics || [];

      onCalculate(result.sbc_model, result.score_crediticio, validGraphics);
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <FormField control={form.control} name="nombre" render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              <Input placeholder="Ingrese su nombre" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="apellido" render={({ field }) => (
          <FormItem>
            <FormLabel>Apellidos</FormLabel>
            <FormControl>
              <Input placeholder="Ingrese sus apellidos" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <TipoDocumentoField form={form} />
        <OcupacionField form={form} />

        <FormField control={form.control} name="meses_trabajando" render={({ field }) => (
          <FormItem>
            <FormLabel>Meses en el trabajo</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ingrese los meses" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="salario_mensual" render={({ field }) => (
          <FormItem>
            <FormLabel>Salario mensual (Dólares)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ingrese su salario mensual" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="monthly_inhand_salary" render={({ field }) => (
          <FormItem>
            <FormLabel>Salario neto mensual</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Salario después de deducciones" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="deuda_total" render={({ field }) => (
          <FormItem>
            <FormLabel>Deuda total</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ingrese su deuda total" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="outstanding_debt" render={({ field }) => (
          <FormItem>
            <FormLabel>Deuda pendiente</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Monto pendiente por pagar" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="cuota_mensual_total" render={({ field }) => (
          <FormItem>
            <FormLabel>Cuota mensual total</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ingrese su cuota mensual total" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="num_credit_cards" render={({ field }) => (
          <FormItem>
            <FormLabel>Tarjetas de crédito</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Número de tarjetas" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="payment_of_min_amount" render={({ field }) => (
          <FormItem>
            <FormLabel>¿Paga el mínimo?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Yes">Sí</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="monto_inversion_mensual" render={({ field }) => (
          <FormItem>
            <FormLabel>Inversión mensual</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Monto invertido" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="experiencia_crediticia" render={({ field }) => (
          <FormItem>
            <FormLabel>Experiencia crediticia (meses)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Meses de historial" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="cantidad_prestamos_activos" render={({ field }) => (
          <FormItem>
            <FormLabel>Préstamos activos</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Cantidad de préstamos" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="balance_mensual" render={({ field }) => (
          <FormItem>
            <FormLabel>Balance mensual</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ingrese su balance mensual" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="delay_from_due_date" render={({ field }) => (
          <FormItem>
            <FormLabel>Retraso de la fecha de vencimiento</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ingrese el retraso" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FechaNacimientoField form={form} />

        <div className="col-span-1 md:col-span-3">
          <Button type="submit" className="w-full mt-4" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Procesando..." : "Consultar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
