"use client"

import React, { useEffect, useState } from "react";
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
import { ArrowUpDown, ChevronDown, Landmark, Trash2 } from "lucide-react"

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
import { Card } from "@/components/ui/card"
import { getRules, deleteRule } from "@/lib/api"
import { Rule } from "@/models/Rule"
import AddRuleDialog from "@/components/AddRuleDialog"

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
    accessorKey: "conditions",
    header: () => "Conditions",
    cell: ({ row }) => {
      const conditions = row.original.conditions;

      const translateOperator = (op: string): string => {
        switch (op) {
          case "$eq": return "igual a";
          case "$gt": return "mayor que";
          case "$lt": return "menor que";
          case "$gte": return "mayor o igual que";
          case "$lte": return "menor o igual que";
          default: return op;
        }
      };

      return (
        <ul className="text-sm space-y-1">
          {conditions.map((c, i) => (
            <li key={i}>
              <span className="font-semibold">{c.field}</span> {translateOperator(c.operator)} {c.value}
            </li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "score_change",
    header: "Score Change",
    cell: ({ row }) => row.getValue("score_change"),
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => row.getValue("message"),
  },
  {
    accessorKey: "effect",
    header: "Effect",
    cell: ({ row }) => row.getValue("effect"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleDeleteRule(row.original.id)}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    )
  },
]

let handleDeleteRule = async (id: number) => {};

export default function ModelRules() {
  const [rulesData, setRulesData] = useState<Rule[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    const response = await getRules();
    if (response && Array.isArray(response.rules)) {
      setRulesData(response.rules);
    }
  };

  handleDeleteRule = async (id: number) => {
    await deleteRule(id);
    fetchRules();
  };

  const table = useReactTable({
    data: rulesData,
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
    },
  });

  return (
    <div className="flex flex-col items-center w-full p-4">
      <Card className="w-full p-6 shadow-lg bg-white mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-center flex-grow">
            <Landmark className="inline-block mb-1" /> Reglas del modelo
          </h2>
          <AddRuleDialog onRuleAdded={fetchRules} />
        </div>
        <div className="flex items-center py-1">
          <Input
            placeholder="Filtrar por effect..."
            value={(table.getColumn("effect")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("effect")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto"> Columns <ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
