"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Printer, FileDown, Send } from "lucide-react"
import type { Invoice } from "./invoices-table"

interface InvoiceViewDialogProps {
  invoice: Invoice
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InvoiceViewDialog({ invoice, open, onOpenChange }: InvoiceViewDialogProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)

    // In a real app, this would trigger the print dialog
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 100)
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Invoice PDF downloaded")
  }

  const handleSendEmail = () => {
    // In a real app, this would send the invoice via email
    alert(`Invoice sent to ${invoice.email}`)
  }

  // Mock invoice items
  const invoiceItems = [
    {
      id: 1,
      description: "Hydrating Face Serum",
      quantity: 2,
      unitPrice: 49.99,
      total: 99.98,
    },
    {
      id: 2,
      description: "Anti-Aging Night Cream",
      quantity: 1,
      unitPrice: 59.99,
      total: 59.99,
    },
  ]

  // Calculate subtotal, tax, and total
  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0)
  const taxRate = 0.08
  const tax = subtotal * taxRate
  const total = subtotal + tax

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Invoice {invoice.id}</DialogTitle>
          <DialogDescription>View invoice details for {invoice.customer}</DialogDescription>
        </DialogHeader>

        <div id="invoice-content" className="space-y-6 py-4">
          {/* Invoice Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image src="/beauty-logo.png" alt="Beauty Co Logo" fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-bold">Beauty Co</h3>
                <p className="text-sm text-muted-foreground">Your Beauty Partner</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-pink-600">INVOICE</h2>
              <p className="text-sm text-muted-foreground">{invoice.id}</p>
            </div>
          </div>

          <Separator />

          {/* Invoice Details */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Bill To:</h3>
              <p>{invoice.customer}</p>
              <p>{invoice.email}</p>
              <p>123 Customer Street</p>
              <p>New York, NY 10001</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Invoice Number:</span>
                <span>{invoice.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Order Reference:</span>
                <span>{invoice.orderRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Invoice Date:</span>
                <span>{invoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Due Date:</span>
                <span>{invoice.dueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span>{invoice.status}</span>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 font-semibold">Item</th>
                  <th className="py-2 font-semibold text-right">Qty</th>
                  <th className="py-2 font-semibold text-right">Unit Price</th>
                  <th className="py-2 font-semibold text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">{item.description}</td>
                    <td className="py-2 text-right">{item.quantity}</td>
                    <td className="py-2 text-right">${item.unitPrice.toFixed(2)}</td>
                    <td className="py-2 text-right">${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Invoice Summary */}
          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="rounded-lg bg-muted p-4 text-sm">
            <h4 className="mb-2 font-semibold">Payment Information</h4>
            <p>Please make payment to the following account:</p>
            <p className="mt-1">Bank: Beauty Bank</p>
            <p>Account: 1234567890</p>
            <p>Routing: 987654321</p>
            <p className="mt-2">Payment Terms: Net 30 days</p>
          </div>

          {/* Thank You Note */}
          <div className="text-center text-sm">
            <p>Thank you for your business!</p>
            <p className="text-muted-foreground">If you have any questions, please contact support@beautyco.com</p>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:space-x-0">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint} disabled={isPrinting}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <FileDown className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
          <Button onClick={handleSendEmail}>
            <Send className="mr-2 h-4 w-4" />
            Send to Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
