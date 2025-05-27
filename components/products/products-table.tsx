"use client"

import { useState } from "react"
import Image from "next/image"
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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus, FileDown, FileUp } from "lucide-react"

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
import { AddProductDialog } from "@/components/products/add-product-dialog"
import { EditProductDialog } from "@/components/products/edit-product-dialog"

export type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  image: string
}

const data: Product[] = [
  {
    id: "PROD-001",
    name: "Hydrating Face Serum",
    category: "Skincare",
    price: 49.99,
    stock: 32,
    status: "In Stock",
    image: "/skincare-serum-bottle.png",
  },
  {
    id: "PROD-002",
    name: "Matte Lipstick Collection",
    category: "Makeup",
    price: 29.99,
    stock: 45,
    status: "In Stock",
    image: "/assorted-lipsticks.png",
  },
  {
    id: "PROD-003",
    name: "Anti-Aging Night Cream",
    category: "Skincare",
    price: 59.99,
    stock: 18,
    status: "In Stock",
    image: "/cream-jar.png",
  },
  {
    id: "PROD-004",
    name: "Volumizing Mascara",
    category: "Makeup",
    price: 24.99,
    stock: 8,
    status: "Low Stock",
    image: "/placeholder-674uv.png",
  },
  {
    id: "PROD-005",
    name: "Vitamin C Brightening Set",
    category: "Skincare",
    price: 79.99,
    stock: 0,
    status: "Out of Stock",
    image: "/skincare-set.png",
  },
  {
    id: "PROD-006",
    name: "Eyeshadow Palette - Sunset",
    category: "Makeup",
    price: 39.99,
    stock: 22,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40&query=eyeshadow palette",
  },
  {
    id: "PROD-007",
    name: "Gentle Cleansing Foam",
    category: "Skincare",
    price: 19.99,
    stock: 37,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40&query=foam cleanser",
  },
  {
    id: "PROD-008",
    name: "Waterproof Eyeliner",
    category: "Makeup",
    price: 17.99,
    stock: 5,
    status: "Low Stock",
    image: "/placeholder.svg?height=40&width=40&query=eyeliner",
  },
  {
    id: "PROD-009",
    name: "Hyaluronic Acid Moisturizer",
    category: "Skincare",
    price: 44.99,
    stock: 14,
    status: "In Stock",
    image: "/placeholder.svg?height=40&width=40&query=moisturizer jar",
  },
  {
    id: "PROD-010",
    name: "Liquid Foundation SPF 30",
    category: "Makeup",
    price: 34.99,
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder-fgey2.png",
  },
]

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative h-10 w-10 overflow-hidden rounded-md">
        <Image
          src={row.getValue("image") || "/placeholder.svg"}
          alt={row.getValue("name")}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("stock")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "In Stock" ? "default" : status === "Low Stock" ? "outline" : "destructive"}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
      const [isEditOpen, setIsEditOpen] = useState(false)

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
              <DropdownMenuItem onClick={() => setIsEditOpen(true)}>Edit Product</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditProductDialog product={product} open={isEditOpen} onOpenChange={setIsEditOpen} />
        </>
      )
    },
  },
]

export function ProductsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isAddOpen, setIsAddOpen] = useState(false)

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
            placeholder="Search products..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Categories <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => table.getColumn("category")?.setFilterValue("")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("category")?.setFilterValue("Skincare")}>
                Skincare
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => table.getColumn("category")?.setFilterValue("Makeup")}>
                Makeup
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <FileDown className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <FileUp className="h-4 w-4" />
            Import
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Product
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
      <AddProductDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
    </div>
  )
}
