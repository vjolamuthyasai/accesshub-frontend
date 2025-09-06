"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, FileText, FileSpreadsheet, FileJson, Loader2 } from "lucide-react"

interface ReportGeneratorProps {
  analysisData: any
}

export function ReportGenerator({ analysisData }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState<string | null>(null)

  const generateReport = async (format: string) => {
    setIsGenerating(format)
    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, this would generate and download the actual report
      const filename = `accessibility-report-${analysisData.id}.${format}`
      console.log(`Generating ${format.toUpperCase()} report: ${filename}`)

      // Simulate download
      const element = document.createElement("a")
      element.href = "#"
      element.download = filename
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    } catch (error) {
      console.error("Report generation failed:", error)
    } finally {
      setIsGenerating(null)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isGenerating !== null}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Report Formats</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => generateReport("pdf")}>
          <FileText className="mr-2 h-4 w-4" />
          PDF Report
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateReport("csv")}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          CSV Export
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => generateReport("json")}>
          <FileJson className="mr-2 h-4 w-4" />
          JSON Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
