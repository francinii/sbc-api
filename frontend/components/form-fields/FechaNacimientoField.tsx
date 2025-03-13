"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ScoreFormSchema } from "@/schemas/score-form-schema";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

interface Props {
  form: UseFormReturn<z.infer<typeof ScoreFormSchema>>;
}

const FechaNacimientoField = ({ form }: Props) => (
  <FormField control={form.control} name="fecha_nacimiento" render={({ field }) => (
    <FormItem>
      <FormLabel>Fecha de nacimiento</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button variant="outline" className="w-full font-normal">
              {field.value ? (
                format(field.value, "dd 'de' MMMM 'de' yyyy", { locale: es }) // ✅ Formato en español
              ) : (
                <span className="font-normal text-gray-500">Seleccione una fecha</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" side="bottom" align="start">
          <Calendar
            locale={es}
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )} />
);

export default FechaNacimientoField;
