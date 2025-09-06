"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Calendar,
  ExternalLink,
  Download,
  Trash2,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import Link from "next/link"

// Mock historical data
const mockHistory = [
  {
    id: "analysis-123",
    url: "https://example.com",
    timestamp: "2024-01-15T10:30:00Z",
    totalIssues: 47,
    criticalIssues: 8,
    complianceScore: 85.9,
    status: "completed",
    trend: "down", // compared to previous analysis
  },
  {
    id: "analysis-124",
    url: "https://mywebsite.org",
    timestamp: "2024-01-14T14:20:00Z",
    totalIssues: 23,
    criticalIssues: 3,
    complianceScore: 92.1,
    status: "completed",
    trend: "up",
  },
  {
    id: "analysis-125",
    url: "https://testsite.com",
    timestamp: "2024-01-13T09:15:00Z",
    totalIssues: 61,
    criticalIssues: 12,
    complianceScore: 78.3,
    status: "completed",
    trend: "same",
  },
  {
    id: "analysis-126",
    url: "https://example.com",
    timestamp: "2024-01-10T16:45:00Z",
    totalIssues: 52,
    criticalIssues: 10,
    complianceScore: 82.1,
    status: "completed",
    trend: "up",
  },
  {
    id: "analysis-127",
    url: "https://newsite.net",
    timestamp: "2024-01-09T11:30:00Z",
    totalIssues: 34,
    criticalIssues: 5,
    complianceScore: 88.7,
    status: "completed",
    trend: "same",
  },
]

export function AnalysisHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredHistory = mockHistory
    .filter((analysis) => {
      const matchesSearch = analysis.url.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === "all" || analysis.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        case "score":
          return b.complianceScore - a.complianceScore
        case "issues":
          return a.totalIssues - b.totalIssues
        case "url":
          return a.url.localeCompare(b.url)
        default:
          return 0
      }
    })

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "secondary"
    if (score >= 80) return "outline"
    return "destructive"
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockHistory.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockHistory.reduce((acc, curr) => acc + curr.complianceScore, 0) / mockHistory.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Compliance rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Sites</CardTitle>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(mockHistory.map((analysis) => analysis.url)).size}</div>
            <p className="text-xs text-muted-foreground">Websites analyzed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockHistory.length}</div>
            <p className="text-xs text-muted-foreground">Analyses run</p>
          </CardContent>
        </Card>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis History</CardTitle>
          <CardDescription>View and manage your previous accessibility analyses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by website URL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (newest first)</SelectItem>
                  <SelectItem value="score">Compliance Score</SelectItem>
                  <SelectItem value="issues">Issue Count</SelectItem>
                  <SelectItem value="url">Website URL</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Website</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Compliance Score</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((analysis) => (
                    <TableRow key={analysis.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{analysis.url}</p>
                          <Badge variant="outline" className="text-xs">
                            {analysis.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{new Date(analysis.timestamp).toLocaleDateString()}</p>
                          <p className="text-muted-foreground">{new Date(analysis.timestamp).toLocaleTimeString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={getScoreBadge(analysis.complianceScore)}>{analysis.complianceScore}%</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{analysis.totalIssues} total</p>
                          <p className="text-red-600">{analysis.criticalIssues} critical</p>
                        </div>
                      </TableCell>
                      <TableCell>{getTrendIcon(analysis.trend)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/results/${analysis.id}`}>
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredHistory.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No analyses match your current filters.</p>
                <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-2">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
