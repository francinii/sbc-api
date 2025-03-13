"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { ScoreFormSchema, ocupacionesEnum } from "@/schemas/score-form-schema";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  form: UseFormReturn<z.infer<typeof ScoreFormSchema>>;
}

const OcupacionField = ({ form }: Props) => (
  <FormField control={form.control} name="ocupacion" render={({ field }) => (
    <FormItem>
      <FormLabel>Ocupación</FormLabel>
      <Select onValueChange={field.onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccione su ocupación" />
        </SelectTrigger>
        <SelectContent>
          {ocupacionesEnum.map((ocupacion) => (
            <SelectItem key={ocupacion} value={ocupacion}>
              {ocupacion.replace("_", " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />
);

export default OcupacionField;
