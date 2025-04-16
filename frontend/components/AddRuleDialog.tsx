// src/components/AddRuleDialog.tsx

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addRule } from "@/lib/api";
import { Rule } from "@/models/Rule";

const applicantFields = [
  "cedula",
  "nombre",
  "apellido",
  "ocupacion",
  "meses_trabajando",
  "salario_mensual",
  "fecha_nacimiento",
  "deuda_total",
  "cuota_mensual_total",
  "tipoDocumento",
  "score_credito",
  "edad",
  "delay_from_due_date",
  "balance_mensual",
  "monthly_inhand_salary",
  "outstanding_debt",
  "num_credit_cards",
  "payment_of_min_amount",
  "monto_inversion_mensual",
  "experiencia_crediticia",
  "cantidad_prestamos_activos"
];

const operators = ["$eq", "$gt", "$lt", "$gte", "$lte"];
const effects = ["success", "info", "warning", "danger"] as const;

type AddRuleDialogProps = {
  onRuleAdded: () => void;
};

export default function AddRuleDialog({ onRuleAdded }: AddRuleDialogProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [effect, setEffect] = useState<typeof effects[number]>("success");
  const [conditions, setConditions] = useState([
    { field: "", operator: "$eq", value: "" }
  ]);

  const handleSubmit = async () => {
    if (!message || !effect || conditions.some(c => !c.field || !c.operator || !c.value)) {
      alert("Todos los campos deben estar completos.");
      return;
    }

    const newRule: Omit<Rule, "id"> = {
      message,
      score_change: 0,
      effect,
      conditions: conditions.map((c, i) => ({ id: i, ...c })),
    };

    try {
      await addRule(newRule);
      setOpen(false);
      onRuleAdded();
      setMessage("");
      setConditions([{ field: "", operator: "$eq", value: "" }]);
    } catch (error) {
      console.error("Error al agregar la regla", error);
    }
  };

  const handleConditionChange = (index: number, key: string, value: string) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [key]: value };
    setConditions(newConditions);
  };

  const addCondition = () => {
    setConditions([...conditions, { field: "", operator: "$eq", value: "" }]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Agregar Regla</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Regla</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Mensaje" value={message} onChange={(e) => setMessage(e.target.value)} />

          <Select value={effect} onValueChange={(v) => setEffect(v as typeof effects[number])}>
            <SelectTrigger><SelectValue placeholder="Tipo de efecto" /></SelectTrigger>
            <SelectContent>
              {effects.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>

          {conditions.map((condition, index) => (
            <div key={index} className="flex gap-2">
              <Select value={condition.field} onValueChange={(v) => handleConditionChange(index, "field", v)}>
                <SelectTrigger><SelectValue placeholder="Campo" /></SelectTrigger>
                <SelectContent>
                  {applicantFields.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={condition.operator} onValueChange={(v) => handleConditionChange(index, "operator", v)}>
                <SelectTrigger><SelectValue placeholder="Operador" /></SelectTrigger>
                <SelectContent>
                  {operators.map((op) => (
                    <SelectItem key={op} value={op}>{
                      op === "$gt" ? "Mayor que" :
                      op === "$lt" ? "Menor que" :
                      op === "$gte" ? "Mayor o igual que" :
                      op === "$lte" ? "Menor o igual que" :
                      "Igual"
                    }</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input placeholder="Valor" value={condition.value} onChange={(e) => handleConditionChange(index, "value", e.target.value)} />
            </div>
          ))}

          <Button variant="secondary" onClick={addCondition}>Agregar Condición</Button>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
