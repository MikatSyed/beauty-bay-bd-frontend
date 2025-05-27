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
import { ArrowUpDown, MoreHorizontal, FileDown } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type Customer = {
  id: string
  name: string
  email: string
  orders: number
  spent: number
  status: "Active" | "Inactive"
  lastOrder: string
  avatar: string
}

const data: Customer[] = [
  {
    id: "CUST-001",
    name: "Jessica Lee",
    email: "jessica.lee@example.com",
    orders: 12,
    spent: 1249.99,
    status: "Active",
    lastOrder: "2023-05-15",
    avatar: "/diverse-woman-portrait.png",
  },
  {
    id: "CUST-002",
    name: "Michael Smith",
    email: "michael.smith@example.com",
    orders: 8,
    spent: 789.95,
    status: "Active",
    lastOrder: "2023-05-10",
    avatar: "/thoughtful-man.png",
  },
  {
    id: "CUST-003",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    orders: 15,
    spent: 1599.85,
    status: "Active",
    lastOrder: "2023-05-18",
    avatar: "/woman-with-glasses.png",
  },
  {
    id: "CUST-004",
    name: "James Wilson",
    email: "james.wilson@example.com",
    orders: 5,
    spent: 429.95,
    status: "Inactive",
    lastOrder: "2023-04-22",
    avatar: "/bearded-man-portrait.png",
  },
  {
    id: "CUST-005",
    name: "Emma Clark",
    email: "emma.clark@example.com",
    orders: 10,
    spent: 899.9,
    status: "Active",
    lastOrder: "2023-05-16",
    avatar: "/red-haired-woman.png",
  },
  {
    id: "CUST-006",
    name: "Daniel Brown",
    email: "daniel.brown@example.com",
    orders: 3,
    spent: 199.97,
    status: "Inactive",
    lastOrder: "2023-03-15",
    avatar: "/placeholder.svg?height=40&width=40&query=man with glasses",
  },
  {
    id: "CUST-007",
    name: "Olivia Johnson",
    email: "olivia.johnson@example.com",
    orders: 9,
    spent: 749.91,
    status: "Active",
    lastOrder: "2023-05-12",
    avatar: "/placeholder.svg?height=40&width=40&query=woman with blonde hair",
  },
  {
    id: "CUST-008",
    name: "William Taylor",
    email: "william.taylor@example.com",
    orders: 6,
    spent: 499.94,
    status: "Active",
    lastOrder: "2023-05-05",
    avatar: "/placeholder.svg?height=40&width=40&query=man with dark hair",
  },
  {
    id: "CUST-009",
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    orders: 11,
    spent: 1099.89,
    status: "Active",
    lastOrder: "2023-05-17",
    avatar: "/placeholder.svg?height=40&width=40&query=woman with brown hair",
  },
  {
    id: "CUST-010",
    name: "Ethan Anderson",
    email: "ethan.anderson@example.com",
    orders: 4,
    spent: 299.96,
    status: "Inactive",
    lastOrder: "2023-04-10",
    avatar: "/placeholder.svg?height=40&width=40&query=man with blonde hair",
  },
]

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={row.original.avatar || "/placeholder.svg"} alt={row.getValue("name")} />
          <AvatarFallback>{row.getValue("name").substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "orders",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Orders
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("orders")}</div>,
  },
  {
    accessorKey: "spent",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Total Spent
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const spent = Number.parseFloat(row.getValue("spent"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(spent)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "lastOrder",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Last Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("lastOrder")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge variant={status === "Active" ? "default" : "secondary"}>{status}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original

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
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>View Orders</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Send Email</DropdownMenuItem>
            <DropdownMenuItem>Add Note</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete Customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function CustomersTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

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
            placeholder="Search customers..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <Select
            value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
            onValueChange={(value) => table.getColumn("status")?.setFilterValue(value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
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
