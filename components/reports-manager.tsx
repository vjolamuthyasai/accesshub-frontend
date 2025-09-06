"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, FileSpreadsheet, FileJson, ExternalLink, Loader2 } from "lucide-react"

// Mock data for available analyses
const mockAnalyses = [
  {
    id: "analysis-123",
    url: "https://example.com",
    timestamp: "2024-01-15T10:30:00Z",
    totalIssues: 47,
    complianceScore: 85.9,
    status: "completed",
  },
  {
    id: "analysis-124",
    url: "https://mywebsite.org",
    timestamp: "2024-01-14T14:20:00Z",
    totalIssues: 23,
    complianceScore: 92.1,
    status: "completed",
  },
  {
    id: "analysis-125",
    url: "https://testsite.com",
    timestamp: "2024-01-13T09:15:00Z",
    totalIssues: 61,
    complianceScore: 78.3,
    status: "completed",
  },
]

const reportFormats = [
  {
    id: "pdf",
    name: "PDF Report",
    description: "Comprehensive formatted report with charts and detailed findings",
    icon: FileText,
    extension: ".pdf",
  },
  {
    id: "csv",
    name: "CSV Export",
    description: "Tabular data export for spreadsheet analysis",
    icon: FileSpreadsheet,
    extension: ".csv",
  },
  {
    id: "json",
    name: "JSON Data",
    description: "Raw analysis data for programmatic use",
    icon: FileJson,
    extension: ".json",
  },
]

export function ReportsManager() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<string>("")
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["pdf"])
  const [isGenerating, setIsGenerating] = useState(false)
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeDetails, setIncludeDetails] = useState(true)
  const [includeSuggestions, setIncludeSuggestions] = useState(true)

  const handleFormatToggle = (formatId: string) => {
    setSelectedFormats((prev) => (prev.includes(formatId) ? prev.filter((id) => id !== formatId) : [...prev, formatId]))
  }

  const handleGenerateReports = async () => {
    if (!selectedAnalysis || selectedFormats.length === 0) return

    setIsGenerating(true)
    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // In a real app, this would trigger actual report generation
      selectedFormats.forEach((format) => {
        const formatInfo = reportFormats.find((f) => f.id === format)
        if (formatInfo) {
          // Simulate download
          console.log(`Downloading ${formatInfo.name} for analysis ${selectedAnalysis}`)
        }
      })
    } catch (error) {
      console.error("Report generation failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const selectedAnalysisData = mockAnalyses.find((analysis) => analysis.id === selectedAnalysis)

  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Create downloadable reports from your accessibility analyses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Analysis Selection */}
          <div className="space-y-2">
            <Label>Select Analysis</Label>
            <Select value={selectedAnalysis} onValueChange={setSelectedAnalysis}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an analysis to generate reports from" />
              </SelectTrigger>
              <SelectContent>
                {mockAnalyses.map((analysis) => (
                  <SelectItem key={analysis.id} value={analysis.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{analysis.url}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {new Date(analysis.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Analysis Preview */}
          {selectedAnalysisData && (
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedAnalysisData.url}</p>
                    <p className="text-sm text-muted-foreground">
                      Analyzed on {new Date(selectedAnalysisData.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary">{selectedAnalysisData.complianceScore}%</div>
                    <p className="text-sm text-muted-foreground">{selectedAnalysisData.totalIssues} issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Format Selection */}
          <div className="space-y-4">
            <Label>Report Formats</Label>
            <div className="grid gap-3">
              {reportFormats.map((format) => {
                const Icon = format.icon
                return (
                  <div key={format.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={format.id}
                      checked={selectedFormats.includes(format.id)}
                      onCheckedChange={() => handleFormatToggle(format.id)}
                    />
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label htmlFor={format.id} className="font-medium cursor-pointer">
                        {format.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">{format.description}</p>
                    </div>
                    <Badge variant="outline">{format.extension}</Badge>
                  </div>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Report Options */}
          <div className="space-y-4">
            <Label>Report Content</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="charts" checked={includeCharts} onCheckedChange={setIncludeCharts} />
                <Label htmlFor="charts">Include charts and visualizations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="details" checked={includeDetails} onCheckedChange={setIncludeDetails} />
                <Label htmlFor="details">Include detailed issue breakdown</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="suggestions" checked={includeSuggestions} onCheckedChange={setIncludeSuggestions} />
                <Label htmlFor="suggestions">Include fix suggestions</Label>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerateReports}
            disabled={!selectedAnalysis || selectedFormats.length === 0 || isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Reports...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Generate {selectedFormats.length} Report{selectedFormats.length !== 1 ? "s" : ""}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Sample Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Reports</CardTitle>
          <CardDescription>Preview what your reports will look like</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {reportFormats.map((format) => {
              const Icon = format.icon
              return (
                <Card key={format.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{format.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{format.description}</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Preview Sample
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
