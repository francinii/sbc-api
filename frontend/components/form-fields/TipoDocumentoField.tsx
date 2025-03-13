"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ScoreFormSchema } from "@/schemas/score-form-schema";
import { formatCedula, formatPasaporte } from "@/utils/formatters";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Props {
  form: UseFormReturn<z.infer<typeof ScoreFormSchema>>;
}

const TipoDocumentoField = ({ form }: Props) => (
  <div className="flex gap-2 col-span-1 md:col-span-1">
    {/* Selector de Tipo de Documento */}
    <FormField control={form.control} name="tipoDocumento" render={({ field }) => (
      <FormItem className="w-32">
        <FormLabel>Tipo</FormLabel>
        <Select onValueChange={(value) => {
          field.onChange(value);
          form.setValue("cedula", ""); // ✅ Resetea el campo cuando cambia el tipo
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cedula">Cédula</SelectItem>
            <SelectItem value="pasaporte">Pasaporte</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )} />

    {/* Campo de Número de Documento */}
    <FormField control={form.control} name="cedula" render={({ field }) => (
      <FormItem className="flex-1">
        <FormLabel>Número de documento</FormLabel>
        <FormControl>
          <Input
            placeholder={form.watch("tipoDocumento") === "cedula" ? "Ingrese su cédula (#-####-####)" : "Ingrese su pasaporte"}
            value={field.value}
            onChange={(e) => {
              const tipo = form.watch("tipoDocumento");
              const formattedValue = tipo === "cedula" ? formatCedula(e.target.value) : formatPasaporte(e.target.value);
              field.onChange(formattedValue);
            }}
            disabled={!form.watch("tipoDocumento")}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  </div>
);

export default TipoDocumentoField;
