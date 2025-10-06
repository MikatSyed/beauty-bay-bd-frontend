"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Edit,
  Trash2,
  Search,
  X,
  FileText,
  FileSpreadsheet,
  Printer,
} from "lucide-react"

import { format } from "date-fns"
import { exportToCSV, exportToExcel, exportToPDF } from "@/lib/export-utils"
import { Category } from "./category-page"

interface CategoriesTableProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onDelete: (category: Category) => void
}

type SortField = "name" | "code" | "productCount" | "createdAt" | "updatedAt"
type SortOrder = "asc" | "desc"

export function CategoriesTable({ categories, onEdit, onDelete }: CategoriesTableProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>("createdAt")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const clearSearch = () => {
    setSearch("")
    setCurrentPage(1)
    setShowSuggestions(false)
  }

  const handleReset = () => {
    setSearch("")
    setStatusFilter("all")
    setSortField("createdAt")
    setSortOrder("desc")
    setCurrentPage(1)
    setShowSuggestions(false)
  }

  const suggestions = useMemo(() => {
    if (!search.trim()) return []

    const searchLower = search.toLowerCase()
    const matches = new Set<string>()

    categories.forEach((category) => {
      if (category.name.toLowerCase().includes(searchLower)) {
        matches.add(category.name)
      }
      if (category.code.toLowerCase().includes(searchLower)) {
        matches.add(category.code)
      }
      if (category.description.toLowerCase().includes(searchLower)) {
        matches.add(category.description)
      }
    })

    return Array.from(matches).slice(0, 5)
  }, [search, categories])

  const filteredAndSortedCategories = useMemo(() => {
    const filtered = categories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.code.toLowerCase().includes(search.toLowerCase()) ||
        category.description.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = statusFilter === "all" || category.status === statusFilter

      return matchesSearch && matchesStatus
    })

    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === "createdAt" || sortField === "updatedAt") {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [categories, search, statusFilter, sortField, sortOrder])

  const totalPages = Math.ceil(filteredAndSortedCategories.length / itemsPerPage)
  const paginatedCategories = filteredAndSortedCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />
    return sortOrder === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  const handleExportCSV = () => {
    exportToCSV(filteredAndSortedCategories, "categories")
  }

  const handleExportExcel = () => {
    exportToExcel(filteredAndSortedCategories, "categories")
  }

  const handleExportPDF = () => {
    exportToPDF(filteredAndSortedCategories, "categories")
  }

  const handlePrint = () => {
    exportToPDF(filteredAndSortedCategories, "categories")
  }

  return (
    <Card className="p-6 border-gray-200 dark:border-gray-700 shadow-none">
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="h-9 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 bg-transparent shadow-none"
            >
              <FileText className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportExcel}
              className="h-9 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 bg-transparent shadow-none"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="h-9 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 bg-transparent shadow-none"
            >
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="h-9 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 bg-transparent shadow-none"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="h-9 border-pink-200 text-pink-600 hover:bg-pink-50 dark:border-pink-700 dark:text-pink-400 dark:hover:bg-pink-950 bg-transparent shadow-none"
            >
              Reset
            </Button>

            <span className="text-sm text-muted-foreground">Show</span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={(value) => {
                setItemsPerPage(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-20 h-9 border-gray-200 dark:border-gray-700 shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="shadow-none">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">Entries</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40 h-9 border-gray-200 dark:border-gray-700 shadow-none">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="shadow-none">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-9 pr-9 h-9 rounded-lg border-gray-300 bg-white focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:border-pink-500 dark:border-gray-600 dark:bg-gray-800 dark:focus-visible:ring-pink-500 dark:focus-visible:border-pink-500 shadow-none"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground shadow-none"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden z-50">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearch(suggestion)
                        setShowSuggestions(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-pink-50 dark:hover:bg-pink-950/20 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left p-3 font-medium text-sm border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleSort("code")}
                      className="flex items-center gap-2 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Code
                      <SortIcon field="code" />
                    </button>
                  </th>
                  <th className="text-left p-3 font-medium text-sm border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-2 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Name
                      <SortIcon field="name" />
                    </button>
                  </th>
                  <th className="text-left p-3 font-medium text-sm border-b border-gray-200 dark:border-gray-700">
                    Description
                  </th>
                  <th className="text-left p-3 font-medium text-sm border-b border-gray-200 dark:border-gray-700">
                    Status
                  </th>
                  <th className="text-left p-3 font-medium text-sm border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleSort("productCount")}
                      className="flex items-center gap-2 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Products
                      <SortIcon field="productCount" />
                    </button>
                  </th>
                  <th className="text-left p-3 font-medium text-sm border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="flex items-center gap-2 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Created
                      <SortIcon field="createdAt" />
                    </button>
                  </th>
                  <th className="text-left p-3 font-medium text-sm border-b border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleSort("updatedAt")}
                      className="flex items-center gap-2 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Updated
                      <SortIcon field="updatedAt" />
                    </button>
                  </th>
                  <th className="text-left p-3 font-medium text-sm border-b border-gray-200 dark:border-gray-700">
                    Image
                  </th>
                  <th className="text-left p-3 font-medium text-sm border-b border-gray-200 dark:border-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-pink-600 border-t-transparent" />
                        <span className="text-muted-foreground">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : paginatedCategories.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-muted-foreground">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  paginatedCategories.map((category, index) => (
                    <tr
                      key={category.id}
                      className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                        index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50/50 dark:bg-gray-800/50"
                      }`}
                    >
                      <td className="p-3 text-sm">{category.code}</td>
                      <td className="p-3 text-sm font-medium">{category.name}</td>
                      <td className="p-3 text-sm text-muted-foreground max-w-xs truncate">{category.description}</td>
                      <td className="p-3">
                        <Badge
                          variant={category.status === "active" ? "default" : "secondary"}
                          className={
                            category.status === "active"
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-gray-500 hover:bg-gray-600 text-white"
                          }
                        >
                          {category.status === "active" ? "A" : "I"}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm">{category.productCount}</td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {format(category.createdAt, "MMM dd, yyyy")}
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {format(category.updatedAt, "MMM dd, yyyy")}
                      </td>
                      <td className="p-3">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="h-10 w-10 rounded object-cover border border-gray-200 dark:border-gray-700"
                        />
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => onEdit(category)}
                            className="h-8 bg-pink-600 hover:bg-pink-700 text-white shadow-none"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(category)}
                            className="h-8 bg-red-600 hover:bg-red-700 shadow-none"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {paginatedCategories.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedCategories.length)} of{" "}
            {filteredAndSortedCategories.length} entries
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-gray-200 dark:border-gray-700 shadow-none"
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={
                    currentPage === page
                      ? "bg-pink-600 hover:bg-pink-700 text-white hidden sm:inline-flex shadow-none"
                      : "border-gray-200 dark:border-gray-700 hidden sm:inline-flex shadow-none"
                  }
                >
                  {page}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-gray-200 dark:border-gray-700 shadow-none"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
