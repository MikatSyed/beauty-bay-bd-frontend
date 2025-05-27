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
import { ArrowUpDown, ChevronDown, MoreHorizontal, FileDown } from "lucide-react"

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

export type Order = {
  id: string
  customer: string
  email: string
  date: string
  total: number
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
  items: number
}

const data: Order[] = [
  {
    id: "ORD-001",
    customer: "Jessica Lee",
    email: "jessica.lee@example.com",
    date: "2023-05-15",
    total: 149.97,
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Michael Smith",
    email: "michael.smith@example.com",
    date: "2023-05-16",
    total: 89.99,
    status: "Shipped",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Sarah Davis",
    email: "sarah.davis@example.com",
    date: "2023-05-17",
    total: 299.95,
    status: "Processing",
    items: 4,
  },
  {
    id: "ORD-004",
    customer: "James Wilson",
    email: "james.wilson@example.com",
    date: "2023-05-18",
    total: 129.99,
    status: "Pending",
    items: 1,
  },
  {
    id: "ORD-005",
    customer: "Emma Clark",
    email: "emma.clark@example.com",
    date: "2023-05-19",
    total: 169.98,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-006",
    customer: "Daniel Brown",
    email: "daniel.brown@example.com",
    date: "2023-05-20",
    total: 79.99,
    status: "Cancelled",
    items: 1,
  },
  {
    id: "ORD-007",
    customer: "Olivia Johnson",
    email: "olivia.johnson@example.com",
    date: "2023-05-21",
    total: 219.97,
    status: "Shipped",
    items: 3,
  },
  {
    id: "ORD-008",
    customer: "William Taylor",
    email: "william.taylor@example.com",
    date: "2023-05-22",
    total: 159.98,
    status: "Processing",
    items: 2,
  },
  {
    id: "ORD-009",
    customer: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    date: "2023-05-23",
    total: 349.95,
    status: "Pending",
    items: 5,
  },
  {
    id: "ORD-010",
    customer: "Ethan Anderson",
    email: "ethan.anderson@example.com",
    date: "2023-05-24",
    total: 99.99,
    status: "Delivered",
    items: 1,
  },
]

export const columns: ColumnDef<Order>[] = [
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
          Order ID
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
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Total
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const total = Number.parseFloat(row.getValue("total"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => <div>{row.getValue("items")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "Delivered"
              ? "default"
              : status === "Shipped"
                ? "secondary"
                : status === "Processing"
                  ? "outline"
                  : status === "Pending"
                    ? "warning"
                    : "destructive"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Print Invoice</DropdownMenuItem>
            <DropdownMenuItem>Send Email</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Cancel Order</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function OrdersTable() {
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
            placeholder="Search orders..."
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
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Processing")}>
                Processing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Shipped")}>
                Shipped
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Delivered")}>
                Delivered
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue("Cancelled")}>
                Cancelled
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
