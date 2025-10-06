import { Category } from "@/app/dashboard/settings/categories/page"
import { format } from "date-fns"


export function exportToCSV(data: Category[], filename: string) {
  const headers = ["Code", "Name", "Description", "Status", "Products", "Created Date", "Updated Date"]
  const csvContent = [
    headers.join(","),
    ...data.map((item) =>
      [
        item.code,
        `"${item.name}"`,
        `"${item.description}"`,
        item.status,
        item.productCount,
        format(item.createdAt, "yyyy-MM-dd"),
        format(item.updatedAt, "yyyy-MM-dd"),
      ].join(","),
    ),
  ].join("\n")

  downloadFile(csvContent, `${filename}_${format(new Date(), "yyyy-MM-dd")}.csv`, "text/csv")
}

export function exportToExcel(data: Category[], filename: string) {
  const headers = ["Code", "Name", "Description", "Status", "Products", "Created Date", "Updated Date"]
  const rows = data.map((item) => [
    item.code,
    item.name,
    item.description,
    item.status,
    item.productCount,
    format(item.createdAt, "yyyy-MM-dd"),
    format(item.updatedAt, "yyyy-MM-dd"),
  ])

  let excelContent = headers.join("\t") + "\n"
  rows.forEach((row) => {
    excelContent += row.join("\t") + "\n"
  })

  downloadFile(excelContent, `${filename}_${format(new Date(), "yyyy-MM-dd")}.xls`, "application/vnd.ms-excel")
}

export function exportToPDF(data: Category[], filename: string) {
  const currentDate = format(new Date(), "MMMM dd, yyyy")
  const currentTime = format(new Date(), "hh:mm a")

  const printWindow = window.open("", "_blank")
  if (!printWindow) return

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Categories Report - Beauty BD</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px;
            background: #fff;
          }
          .invoice-header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #ec4899;
          }
          .company-name {
            font-size: 32px;
            font-weight: bold;
            color: #ec4899;
            margin-bottom: 10px;
          }
          .report-title {
            font-size: 24px;
            color: #333;
            margin-bottom: 15px;
          }
          .date-time {
            font-size: 14px;
            color: #666;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            background: #ec4899;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
          }
          td {
            padding: 10px 12px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 13px;
            color: #333;
          }
          tr:nth-child(even) {
            background: #f9fafb;
          }
          .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
          }
          .status-active {
            background: #10b981;
            color: white;
          }
          .status-inactive {
            background: #6b7280;
            color: white;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
          @media print {
            body {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <div class="company-name">Beauty BD</div>
          <div class="report-title">Categories Report</div>
          <div class="date-time">
            <div>${currentDate} at ${currentTime}</div>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Products</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (item) => `
              <tr>
                <td>${item.code}</td>
                <td><strong>${item.name}</strong></td>
                <td>${item.description}</td>
                <td>
                  <span class="status-badge status-${item.status}">
                    ${item.status.toUpperCase()}
                  </span>
                </td>
                <td>${item.productCount}</td>
                <td>${format(item.createdAt, "MMM dd, yyyy")}</td>
                <td>${format(item.updatedAt, "MMM dd, yyyy")}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
        
        <div class="footer">
          <p>Total Categories: ${data.length}</p>
          <p>Generated by Beauty BD Category Management System</p>
        </div>
      </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()

  setTimeout(() => {
    printWindow.print()
    printWindow.close()
  }, 250)
}

export function printInvoice(data: Category[]) {
  const currentDate = format(new Date(), "MMMM dd, yyyy")
  const currentTime = format(new Date(), "hh:mm a")

  const printWindow = window.open("", "_blank")
  if (!printWindow) return

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Categories - Beauty BD</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px;
            background: #fff;
          }
          .invoice-header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #ec4899;
          }
          .company-name {
            font-size: 36px;
            font-weight: bold;
            color: #ec4899;
            margin-bottom: 10px;
            letter-spacing: 1px;
          }
          .report-title {
            font-size: 24px;
            color: #333;
            margin-bottom: 15px;
          }
          .date-time {
            font-size: 14px;
            color: #666;
          }
          .summary {
            display: flex;
            justify-content: space-around;
            margin: 30px 0;
            padding: 20px;
            background: #fdf2f8;
            border-radius: 8px;
          }
          .summary-item {
            text-align: center;
          }
          .summary-label {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
          }
          .summary-value {
            font-size: 24px;
            font-weight: bold;
            color: #ec4899;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th {
            background: #ec4899;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
          }
          td {
            padding: 10px 12px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 13px;
            color: #333;
          }
          tr:nth-child(even) {
            background: #f9fafb;
          }
          .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
          }
          .status-active {
            background: #10b981;
            color: white;
          }
          .status-inactive {
            background: #6b7280;
            color: white;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
          @media print {
            body {
              padding: 20px;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <div class="company-name">Beauty BD</div>
          <div class="report-title">Categories Inventory Report</div>
          <div class="date-time">
            <div>${currentDate} at ${currentTime}</div>
          </div>
        </div>
        
        <div class="summary">
          <div class="summary-item">
            <div class="summary-label">Total Categories</div>
            <div class="summary-value">${data.length}</div>
          </div>
          <div class="summary-item">
            <div class="summary-label">Active Categories</div>
            <div class="summary-value">${data.filter((c) => c.status === "active").length}</div>
          </div>
          <div class="summary-item">
            <div class="summary-label">Total Products</div>
            <div class="summary-value">${data.reduce((sum, c) => sum + c.productCount, 0)}</div>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Products</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (item) => `
              <tr>
                <td>${item.code}</td>
                <td><strong>${item.name}</strong></td>
                <td>${item.description}</td>
                <td>
                  <span class="status-badge status-${item.status}">
                    ${item.status.toUpperCase()}
                  </span>
                </td>
                <td>${item.productCount}</td>
                <td>${format(item.createdAt, "MMM dd, yyyy")}</td>
                <td>${format(item.updatedAt, "MMM dd, yyyy")}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
        
        <div class="footer">
          <p><strong>Beauty BD</strong> - Category Management System</p>
          <p>This is a computer-generated report</p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
