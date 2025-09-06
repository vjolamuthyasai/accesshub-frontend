"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, ExternalLink, Copy } from "lucide-react"

interface Issue {
  id: string
  rule: string
  description: string
  severity: "Critical" | "Serious" | "Moderate" | "Minor"
  category: string
  element: string
  suggestion: string
  wcagLevel: string
  wcagCriterion: string
}

interface IssuesTableProps {
  issues: Issue[]
}

export function IssuesTable({ issues }: IssuesTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch =
        issue.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.suggestion.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSeverity = severityFilter === "all" || issue.severity === severityFilter
      const matchesCategory = categoryFilter === "all" || issue.category === categoryFilter

      return matchesSearch && matchesSeverity && matchesCategory
    })
  }, [issues, searchTerm, severityFilter, categoryFilter])

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "destructive"
      case "Serious":
        return "secondary"
      case "Moderate":
        return "outline"
      case "Minor":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "text-red-600"
      case "Serious":
        return "text-orange-600"
      case "Moderate":
        return "text-yellow-600"
      case "Minor":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility Issues</CardTitle>
        <CardDescription>Detailed list of all accessibility issues found during the analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues by rule name, description, or suggestion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="Serious">Serious</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Minor">Minor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Perceivable">Perceivable</SelectItem>
                <SelectItem value="Operable">Operable</SelectItem>
                <SelectItem value="Understandable">Understandable</SelectItem>
                <SelectItem value="Robust">Robust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredIssues.length} of {issues.length} issues
            </p>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {severityFilter !== "all" && `${severityFilter} • `}
                {categoryFilter !== "all" && `${categoryFilter} • `}
                {searchTerm && `"${searchTerm}"`}
              </span>
            </div>
          </div>

          {/* Issues Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>WCAG</TableHead>
                  <TableHead>Element</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{issue.rule}</p>
                        <p className="text-sm text-muted-foreground">{issue.description}</p>
                        <p className="text-xs text-green-700 bg-green-50 p-1 rounded">💡 {issue.suggestion}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityVariant(issue.severity)} className={getSeverityColor(issue.severity)}>
                        {issue.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{issue.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-mono">{issue.wcagCriterion}</p>
                        <p className="text-muted-foreground">Level {issue.wcagLevel}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <code className="text-xs bg-muted p-1 rounded block overflow-hidden text-ellipsis">
                          {issue.element}
                        </code>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(issue.element)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredIssues.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No issues match your current filters.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSeverityFilter("all")
                  setCategoryFilter("all")
                }}
                className="mt-2"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
