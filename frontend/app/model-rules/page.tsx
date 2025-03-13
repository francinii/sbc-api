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

const data = [
  {
    condition: {
      cuota_mensual_total: { "$gt": 0.2 },
      score_credito: { "$gte": 0.4, "$lte": 0.6 }
    },
    score_change: -20,
    effect: "warning",
    message: "Se recomienda reducir otras deudas antes de solicitar crédito."
  },
  {
    condition: {
      deuda_total: { "$lt": 0.5 },
      cuota_mensual_total: { "$lt": 0.1 }
    },
    score_change: 30,
    effect: "good",
    message: "Acceso a mejores tasas de interés."
  },
  {
    condition: {
      ocupacion: "Riesgo Alto",
      meses_trabajando: { "$gte": 24 }
    },
    score_change: 10,
    effect: "neutral",
    message: "Evaluar caso detalladamente antes de tomar una decisión."
  },
  {
    condition: {
      cuota_mensual_total: { "$gt": 0.3 }
    },
    score_change: -50,
    effect: "bad",
    message: "Rechazo del crédito debido a alta cuota mensual."
  },
  {
    condition: {
      meses_trabajando: { "$lt": 6 },
      score_credito: { "$lt": 0.4 }
    },
    score_change: -40,
    effect: "bad",
    message: "Rechazo automático por historial crediticio bajo y poca estabilidad laboral."
  },
  {
    condition: {
      ocupacion: "Riesgo Alto",
      meses_trabajando: { "$lt": 6 }
    },
    score_change: -15,
    effect: "warning",
    message: "Requiere mayor evaluación financiera antes de rechazar."
  },
  {
    condition: {
      meses_trabajando: { "$gte": 6, "$lt": 24 },
      ocupacion: "Riesgo Medio",
      score_credito: { "$gte": 0.4, "$lte": 0.6 }
    },
    score_change: -10,
    effect: "neutral",
    message: "Revisión adicional necesaria antes de aprobar crédito."
  },
  {
    condition: {
      score_credito: { "$gt": 0.7 },
      deuda_total: { "$lt": 0.5 },
      cuota_mensual_total: { "$lt": 0.2 }
    },
    score_change: 40,
    effect: "good",
    message: "Aprobación con condiciones favorables."
  },
  {
    condition: {
      score_credito: { "$lt": 0.4 },
      cuota_mensual_total: { "$lt": 0.1 },
      meses_trabajando: { "$gte": 24 }
    },
    score_change: 5,
    effect: "neutral",
    message: "Evaluar alternativas de crédito con garantías adicionales."
  },
  {
    condition: {
      ocupacion: "Riesgo Bajo",
      meses_trabajando: { "$gte": 24 },
      score_credito: { "$gt": 0.7 }
    },
    score_change: 50,
    effect: "good",
    message: "Aprobación automática del crédito."
  },
  {
    condition: {
      ocupacion: "Riesgo Medio",
      score_credito: { "$gte": 0.4, "$lte": 0.6 },
      deuda_total: { "$gt": 0.5 }
    },
    score_change: -15,
    effect: "warning",
    message: "Establecer límite de crédito reducido."
  },
  {
    condition: {
      ocupacion: "Riesgo Alto",
      deuda_total: { "$gt": 1.0 },
      score_credito: { "$lt": 0.4 }
    },
    score_change: -50,
    effect: "bad",
    message: "Rechazo del crédito por alta deuda y bajo score."
  }
];

export type Rule = {
    condition: {};
    score_change: number;
    message: string;
    effect: string;
}

export const columns: ColumnDef<Rule>[] = [
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
    accessorKey: "condition",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Condition
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const condition = row.getValue("condition");
  
      // Ensure condition is an object before processing
      if (!condition || typeof condition !== "object") {
        return <div className="text-gray-500 italic">No conditions</div>;
      }
  
      // Function to format conditions into readable text
      const formatCondition = (conditionObj: Record<string, any>) => {
        return Object.entries(conditionObj)
          .map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
              return Object.entries(value)
                .map(([operator, operand]) => {
                  let operatorText = "";
                  switch (operator) {
                    case "$gt":
                      operatorText = "greater than";
                      break;
                    case "$lt":
                      operatorText = "less than";
                      break;
                    case "$gte":
                      operatorText = "greater than or equal to";
                      break;
                    case "$lte":
                      operatorText = "less than or equal to";
                      break;
                    default:
                      operatorText = operator;
                  }
                  return `${key} ${operatorText} ${operand}`;
                })
                .join(" and ");
            }
            return `${key} equals ${value}`;
          })
          .join(" and ");
      };
  
      return <div className="capitalize">{formatCondition(condition)}</div>;
    },
  },
  
  {
    accessorKey: "score_change",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Score Change
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("score_change")}</div>,
  },
  {
    accessorKey: "message",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Message
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("message")}</div>,
  },
  {
    accessorKey: "effect",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Effect
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("effect")}</div>,
  }
]

export default function ModelRules() {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

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
            <Card className="w-full p-6 shadow-lg bg-white mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-center flex-grow">
                        <Landmark className="inline-block mb-1" /> Reglas del modelo
                    </h2>
                </div>
                <div className="flex items-center py-1">
                    <Input
                        placeholder="Filtrar por effect..." 
                        value={(table.getColumn("effect")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("effect")?.setFilterValue(event.target.value)
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
        </div>
    )
}
