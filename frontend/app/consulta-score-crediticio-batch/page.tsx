"use client"

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Landmark, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card";
import * as XLSX from "xlsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getSbcModel, submitApplicantData } from "@/lib/api";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export type Applicant = {
    cedula: string;
    nombre: string;
    apellido: string;
    edad: number;
    ocupacion: string;
    salario_mensual: number;
    score: number;
    result: string;
    meses_trabajando: number;
    cuota_mensual_total: number;
    score_credito: number;
    deuda_total: number;
}

export const columns: ColumnDef<Applicant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "cedula",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cédula
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cedula")}</div>
    ),
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("nombre")}</div>,
  },
  {
    accessorKey: "apellido",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apellidos
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("apellido")}</div>,
  },
  {
    accessorKey: "edad",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Edad
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("edad")}</div>,
  },
  {
    accessorKey: "ocupacion",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ocupación
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("ocupacion")}</div>,
  },
  {
    accessorKey: "salario_mensual",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Salario Mensual
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
        const amount = parseFloat(row.getValue("salario_mensual"))
  
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
  
        return <div className="font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Score Crediticio
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("score")}</div>,
  },
  {
    accessorKey: "result",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Resultado
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("result")}</div>,
  }
]

export default function ConsultaScoreCrediticioBatch() {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState<any[]>([]);
    const [open, setOpen] = useState(true); // Dialog para cargar archivo
    const [analysisCompleted, setAnalysisCompleted] = useState(false); // Estado para el AlertDialog
    const [rulesData, setRulesData] = useState<{ regla: string; descripcion: string; puntos: string }[]>([]);
    const [rulesDialogOpen, setRulesDialogOpen] = useState(false);

    const handleViewRules = async (applicant: any) => {
        try {
            const response = await getSbcModel(applicant.original);
    
            if (Array.isArray(response) && response.length > 0) {
                // Si la respuesta es un array válido con reglas, se almacena directamente
                setRulesData(response);
            } else {
                // Si la respuesta no tiene reglas, se establece un mensaje por defecto
                setRulesData([{ regla: "Error", descripcion: "No se encontraron reglas", puntos: "N/A" }]);
            }
    
            setRulesDialogOpen(true);
        } catch (error) {
            console.error("Error obteniendo reglas:", error);
            setRulesData([{ regla: "Error", descripcion: "Error al obtener reglas", puntos: "N/A" }]);
            setRulesDialogOpen(true);
        }
    };
    

    // Manejo de la carga del archivo
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            parseFile(selectedFile);
            setOpen(false);
        }
    };

    // Convertir el archivo en JSON y limpiar la tabla
    const parseFile = (file: File) => {
        setData([]);
        setAnalysisCompleted(false); // Reiniciar estado del alert
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

            if (!Array.isArray(jsonData)) {
            console.error("Error: El archivo no contiene datos válidos.");
            return;
            }

            // 🔹 Formatear datos y agregar "Pendiente de análisis"
            const processedData = jsonData.map((item: any) => ({
                cedula: item.cedula || "",
                nombre: item.nombre || "",
                apellido: item.apellido || "",
                ocupacion: item.ocupacion || "",
                meses_trabajando: item.meses_trabajando,
                salario_mensual: item.salario_mensual || 0,
                edad: item.edad || 0,
                deuda_total: item.deuda_total || 0,
                cuota_mensual_total: item.cuota_mensual_total,
                score_credito: 0,
                score: "Pendiente de análisis",
                result: "Pendiente de análisis",
            }));

            setData(processedData);

            const payload = jsonData.map((item: any) => ({
                cedula: item.cedula,
                nombre: item.nombre,
                apellido: item.apellido,
                edad: item.edad,
                ocupacion: item.ocupacion,
                meses_trabajando: item.meses_trabajando,
                salario_mensual: item.salario_mensual,
                deuda_total: item.deuda_total || 0,
                cuota_mensual_total: item.cuota_mensual_total,
                score_credito: 0,
                delay_from_due_date: item.delay_from_due_date,
                balance_mensual: item.balance_mensual
            }));

            processApplicants(payload);
        };
        reader.readAsArrayBuffer(file);
    };
    
    const processApplicants = async (applicants: any[]) => {
        await Promise.all(
            applicants.map(async (applicant, index) => {
                try {
                    setData((prev) => {
                        const newData = [...prev];
                        newData[index].score = "Analizando...";
                        newData[index].result = "Analizando...";
                        return newData;
                    });
    
                    const result = await submitApplicantData(applicant);
            
                    console.log(result);
    
                    setData((prev) => {
                        const newData = [...prev];
                        newData[index].score = result.score_crediticio.prediction_score ?? "No disponible";
                        newData[index].result = result.score_crediticio.prediction_label ?? "No disponible";
                        return newData;
                    });
    
                } catch (error) {
                    console.error("Error en el análisis de crédito:", error);
                    setData((prev) => {
                        const newData = [...prev];
                        newData[index].score = "Error en análisis";
                        newData[index].result = "Error en análisis";
                        return newData;
                    });
                }
            })
        );
        setAnalysisCompleted(true);
      };

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        }
    })
    
    return (
        <div className="flex flex-col items-center w-full p-4">
            {/* 🔹 Dialogo de carga de archivo */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cargar Archivo Excel</DialogTitle>
                        <DialogDescription>Cargue un archivo Excel (.xlsx o .csv) con la información de los solicitantes para realizar un análisis de score crediticio en grupo.</DialogDescription>
                    </DialogHeader>
                    <Input type="file" accept=".xlsx,.csv" onChange={handleFileUpload} />
                </DialogContent>
            </Dialog>

            <Card className="w-full p-6 shadow-lg bg-white mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-center flex-grow">
                        <Landmark className="inline-block mb-1" /> Consulta de Score Crediticio
                    </h2>
                </div>
                <div>
            <Button variant="outline" onClick={() => setOpen(true)}>Cargar Nuevo Archivo</Button>
                </div>
                <div className="flex items-center py-1">
                    <Input
                        placeholder="Filtrar por cédula..." 
                        value={(table.getColumn("cedula")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("cedula")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto"> Columns <ChevronDown /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? 
                                (table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                        <TableCell>
                                            <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleViewRules(row)}>Ver Reglas</DropdownMenuItem>
                                            </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))) : 
                                (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
                        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
                    </div>
                </div>
            </Card>
            <AlertDialog open={analysisCompleted} onOpenChange={setAnalysisCompleted}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Análisis Completado</AlertDialogTitle>
                        <AlertDialogDescription>El análisis de score crediticio para todos los solicitantes ha sido completado.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setAnalysisCompleted(false)}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={rulesDialogOpen} onOpenChange={setRulesDialogOpen}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Reglas de Evaluación</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    {rulesData.length > 0 ? (
                        <ul className="list-disc ml-5 space-y-2">
                        {rulesData.map((rule, index) => (
                            <li key={index}>
                            <strong>{rule.regla}:</strong> {rule.descripcion} (<span className="text-red-500">{rule.puntos} puntos</span>)
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <div>No hay reglas disponibles.</div>
                    )}
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setRulesDialogOpen(false)}>Cerrar</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
