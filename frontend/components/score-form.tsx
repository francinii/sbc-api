"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ScoreForm({ onCalculate }: { onCalculate: (resultado: string) => void }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    tipoDocumento: "",
    cedula: "",
    ocupacion: "",
    salarioMensual: "",
    salarioAnual: "",
    mesesTrabajo: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    
    if (name === "cedula" && formData.tipoDocumento === "cedula") {
      value = value.replace(/\D/g, "");
      if (value.length > 9) value = value.slice(0, 9);
      if (value.length >= 5) value = `${value.slice(0, 1)}-${value.slice(1, 5)}-${value.slice(5)}`;
      else if (value.length >= 2) value = `${value.slice(0, 1)}-${value.slice(1)}`;
    }
    
    if (name === "cedula" && formData.tipoDocumento === "pasaporte") {
      value = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    }
    
    if (name === "mesesTrabajo") {
      value = value.replace(/\D/g, "");
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.apellidos) newErrors.apellidos = "Los apellidos son obligatorios.";
    if (!formData.ocupacion) newErrors.ocupacion = "La ocupación es obligatoria.";
    
    if (!formData.tipoDocumento) {
      newErrors.tipoDocumento = "Debe seleccionar un tipo de documento.";
    }
    
    if (!formData.cedula) {
      newErrors.cedula = "El número de documento es obligatorio.";
    } else if (formData.tipoDocumento === "cedula" && !/^\d{1}-\d{4}-\d{4}$/.test(formData.cedula)) {
      newErrors.cedula = "El formato de cédula debe ser X-XXXX-XXXX.";
    } else if (formData.tipoDocumento === "pasaporte" && !/^[A-Z0-9]{6,9}$/.test(formData.cedula)) {
      newErrors.cedula = "El número de pasaporte no es válido.";
    }
    
    if (!formData.salarioMensual || parseFloat(formData.salarioMensual) <= 0) {
      newErrors.salarioMensual = "El salario mensual debe ser mayor a 0.";
    }
    if (!formData.salarioAnual || parseFloat(formData.salarioAnual) <= 0) {
      newErrors.salarioAnual = "El salario anual debe ser mayor a 0.";
    }
    if (!formData.mesesTrabajo || parseInt(formData.mesesTrabajo) < 0) {
      newErrors.mesesTrabajo = "Los meses de trabajo no pueden ser negativos.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const esApto = Math.random() > 0.5 ? "Es Apto" : "No es Apto";
      onCalculate(esApto);
    }
  };

  return (
    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <Input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
      <Input name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} />
      <div className="flex gap-2 col-span-1 md:col-span-1">
        <Select onValueChange={(value) => setFormData({ ...formData, tipoDocumento: value, cedula: "" })}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Documento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cedula">Cédula</SelectItem>
            <SelectItem value="pasaporte">Pasaporte</SelectItem>
          </SelectContent>
        </Select>
        <Input name="cedula" placeholder="Número de documento" value={formData.cedula} onChange={handleChange} disabled={!formData.tipoDocumento} />
      </div>
      <Input name="ocupacion" placeholder="Ocupación" value={formData.ocupacion} onChange={handleChange} />
      <Input name="mesesTrabajo" placeholder="Meses en el trabajo actual" type="text" value={formData.mesesTrabajo} onChange={handleChange} />
      <Input name="salarioMensual" placeholder="Salario mensual" type="number" value={formData.salarioMensual} onChange={handleChange} />
      <Input name="salarioAnual" placeholder="Salario anual bruto" type="number" value={formData.salarioAnual} onChange={handleChange} />
      <div className="col-span-1 md:col-span-3">
        <Button className="w-full mt-4" onClick={handleSubmit}>
          Consultar
        </Button>
      </div>
      {Object.keys(errors).length > 0 && (
        <div className="col-span-1 md:col-span-3 text-red-500 text-sm">
          {Object.values(errors).map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </CardContent>
  );
}
