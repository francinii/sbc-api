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

import { submitApplicantData } from "@/lib/api";
import { Applicant } from "@/models/applicant";
import { ScoreFormSchema } from "@/schemas/score-form-schema";
import TipoDocumentoField from "@/components/form-fields/TipoDocumentoField";
import FechaNacimientoField from "@/components/form-fields/FechaNacimientoField";
import OcupacionField from "@/components/form-fields/OcupacionField";

interface ScoreFormProps {
  form: UseFormReturn<z.infer<typeof ScoreFormSchema>>;
  onCalculate: (sbc_model: any, score_crediticio: any) => void;
}

export default function ScoreForm({ form, onCalculate }: ScoreFormProps) {

  const calcularEdad = (fechaNacimiento: string): number => {
    const fecha = new Date(fechaNacimiento.split("-").reverse().join("-")); // Convierte de "dd-MM-yyyy" a "yyyy-MM-dd"
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
      onCalculate(result.sbc_model, result.score_crediticio);
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
            <FormLabel>Salario mensual</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ingrese su salario mensual" {...field} />
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

        <FormField control={form.control} name="cuota_mensual_total" render={({ field }) => (
          <FormItem>
            <FormLabel>Cuota mensual total</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ingrese su cuota mensual total" {...field} />
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
              <Input type="number" placeholder="Ingrese el retraso de la fecha de vencimiento" {...field} />
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
