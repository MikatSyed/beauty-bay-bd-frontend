"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, FileDown, Eye, Printer, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { InvoiceViewDialog } from "@/components/invoices/invoice-view-dialog"

export type Invoice = {
  id: string
  customer: string
  email: string
  date: string
  dueDate: string
  amount: number
  status: "Paid" | "Pending" | "Overdue" | "Draft"
  orderRef: string
}

const data: Invoice[] = [
  {
    id: "INV-001",
    customer: "Jessica Lee",
    email: "jessica.lee@example.com",
    date: "2023-05-15",
    dueDate: "2023-06-15",
    amount: 149.97,
    status: "Paid",
    orderRef: "ORD-001",
  },
  {
    id: "INV-002",
    customer: "Michael Smith",
    email: "michael.smith@example.com",
    date: "2023-05-16",
    dueDate: "2023-06-16",
    amount: 89.99,
    status: "Paid",
    orderRef: "ORD-002",
  },
  {
    id: "INV-003",
    customer: "Sarah Davis",
    email: "sarah.davis@example.com",
    date: "2023-05-17",
    dueDate: "2023-06-17",
    amount: 299.95,
    status: "Pending",
    orderRef: "ORD-003",
  },
  {
    id: "INV-004",
    customer: "James Wilson",
    email: "james.wilson@example.com",
    date: "2023-05-18",
    dueDate: "2023-06-18",
    amount: 129.99,
    status: "Pending",
    orderRef: "ORD-004",
  },
  {
    id: "INV-005",
    customer: "Emma Clark",
    email: "emma.clark@example.com",
    date: "2023-05-19",
    dueDate: "2023-06-19",
    amount: 169.98,
    status: "Paid",
    orderRef: "ORD-005",
  },
  {
    id: "INV-006",
    customer: "Daniel Brown",
    email: "daniel.brown@example.com",
    date: "2023-04-20",
    dueDate: "2023-05-20",
    amount: 79.99,
    status: "Overdue",
    orderRef: "ORD-006",
  },
  {
    id: "INV-007",
    customer: "Olivia Johnson",
    email: "olivia.johnson@example.com",
    date: "2023-05-21",
    dueDate: "2023-06-21",
    amount: 219.97,
    status: "Paid",
    orderRef: "ORD-007",
  },
  {
    id: "INV-008",
    customer: "William Taylor",
    email: "william.taylor@example.com",
    date: "2023-05-22",
    dueDate: "2023-06-22",
    amount: 159.98,
    status: "Pending",
    orderRef: "ORD-008",
  },
  {
    id: "INV-009",
    customer: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    date: "2023-04-23",
    dueDate: "2023-05-23",
    amount: 349.95,
    status: "Overdue",
    orderRef: "ORD-009",
  },
  {
    id: "INV-010",
    customer: "Ethan Anderson",
    email: "ethan.anderson@example.com",
    date: "2023-05-24",
    dueDate: "2023-06-24",
    amount: 99.99,
    status: "Draft",
    orderRef: "ORD-010",
  },
]

export const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Invoice #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <div>{row.getValue("customer")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Issue Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("dueDate")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "Paid"
              ? "default"
              : status === "Pending"
                ? "outline"
                : status === "Draft"
                  ? "secondary"
                  : "destructive"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "orderRef",
    header: "Order Ref",
    cell: ({ row }) => <div>{row.getValue("orderRef")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice = row.original
      const [isViewOpen, setIsViewOpen] = useState(false)

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setIsViewOpen(true)}>
                <Eye className="mr-2 h-4 w-4" />
                View Invoice
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileDown className="mr-2 h-4 w-4" />
                Download PDF
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                View Order
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InvoiceViewDialog invoice={invoice} open={isViewOpen} onOpenChange={setIsViewOpen} />
        </>
      )
    },
  },
]

export function InvoicesTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [date, setDate] = useState<Date>()

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
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search invoices..."
            value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("id")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Paid")}>
                Paid
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Overdue")}>
                Overdue
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Draft")}>
                Draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Filter by date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Printer className="h-4 w-4" />
            Print Selected
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <FileDown className="h-4 w-4" />
            Export
          </Button>
        </div>
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
