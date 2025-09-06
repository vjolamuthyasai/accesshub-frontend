import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { ResultsSummary } from "@/components/results-summary"
import { ResultsCharts } from "@/components/results-charts"
import { IssuesTable } from "@/components/issues-table"
import { CategoryBreakdown } from "@/components/category-breakdown"
import { ReportGenerator } from "@/components/report-generator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, ExternalLink } from "lucide-react"

// Mock data for demonstration
const mockAnalysisData = {
  id: "analysis-123",
  url: "https://example.com",
  timestamp: "2024-01-15T10:30:00Z",
  status: "completed",
  summary: {
    totalIssues: 47,
    criticalIssues: 8,
    seriousIssues: 15,
    moderateIssues: 18,
    minorIssues: 6,
    passedRules: 73,
    failedRules: 12,
    complianceScore: 85.9,
  },
  severityBreakdown: [
    { name: "Critical", value: 8, color: "#be123c" },
    { name: "Serious", value: 15, color: "#f97316" },
    { name: "Moderate", value: 18, color: "#eab308" },
    { name: "Minor", value: 6, color: "#22c55e" },
  ],
  categoryBreakdown: [
    { name: "Perceivable", issues: 20, passed: 25 },
    { name: "Operable", issues: 12, passed: 18 },
    { name: "Understandable", issues: 10, passed: 15 },
    { name: "Robust", issues: 5, passed: 15 },
  ],
  issues: [
    {
      id: "1",
      rule: "color-contrast",
      description: "Elements must have sufficient color contrast",
      severity: "Critical",
      category: "Perceivable",
      element: "<button class='btn-primary'>Submit</button>",
      suggestion: "Increase contrast ratio to at least 4.5:1 for normal text",
      wcagLevel: "AA",
      wcagCriterion: "1.4.3",
    },
    {
      id: "2",
      rule: "alt-text",
      description: "Images must have alternative text",
      severity: "Serious",
      category: "Perceivable",
      element: "<img src='logo.png'>",
      suggestion: "Add descriptive alt attribute to the image",
      wcagLevel: "A",
      wcagCriterion: "1.1.1",
    },
    {
      id: "3",
      rule: "keyboard-navigation",
      description: "All interactive elements must be keyboard accessible",
      severity: "Critical",
      category: "Operable",
      element: "<div onclick='handleClick()'>Click me</div>",
      suggestion: "Use button element or add tabindex and keyboard event handlers",
      wcagLevel: "A",
      wcagCriterion: "2.1.1",
    },
    {
      id: "4",
      rule: "heading-order",
      description: "Heading levels should not be skipped",
      severity: "Moderate",
      category: "Perceivable",
      element: "<h1>Title</h1><h3>Subtitle</h3>",
      suggestion: "Use h2 instead of h3 to maintain proper heading hierarchy",
      wcagLevel: "AA",
      wcagCriterion: "1.3.1",
    },
    {
      id: "5",
      rule: "form-labels",
      description: "Form inputs must have associated labels",
      severity: "Serious",
      category: "Perceivable",
      element: "<input type='email' placeholder='Email'>",
      suggestion: "Add a label element or aria-label attribute",
      wcagLevel: "A",
      wcagCriterion: "1.3.1",
    },
  ],
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          {/* Analysis Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Analysis Results</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{mockAnalysisData.url}</span>
                <ExternalLink className="h-4 w-4" />
              </div>
              <p className="text-sm text-muted-foreground">
                Analyzed on {new Date(mockAnalysisData.timestamp).toLocaleDateString()} at{" "}
                {new Date(mockAnalysisData.timestamp).toLocaleTimeString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Re-analyze
              </Button>
              <ReportGenerator analysisData={mockAnalysisData} />
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Analysis Complete
            </Badge>
            <Badge variant="outline">WCAG 2.1 AA</Badge>
          </div>

          {/* Summary Cards */}
          <ResultsSummary data={mockAnalysisData.summary} />

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="issues">All Issues</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ResultsCharts
                severityData={mockAnalysisData.severityBreakdown}
                categoryData={mockAnalysisData.categoryBreakdown}
              />

              {/* Compliance Score Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Overall Compliance Score</CardTitle>
                  <CardDescription>Based on WCAG 2.1 AA guidelines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-4xl font-bold text-primary">{mockAnalysisData.summary.complianceScore}%</div>
                      <p className="text-sm text-muted-foreground">
                        {mockAnalysisData.summary.passedRules} of{" "}
                        {mockAnalysisData.summary.passedRules + mockAnalysisData.summary.failedRules} rules passed
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-2xl font-semibold text-destructive">
                        {mockAnalysisData.summary.totalIssues}
                      </div>
                      <p className="text-sm text-muted-foreground">Total Issues</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <CategoryBreakdown categoryData={mockAnalysisData.categoryBreakdown} issues={mockAnalysisData.issues} />
            </TabsContent>

            <TabsContent value="issues" className="space-y-6">
              <IssuesTable issues={mockAnalysisData.issues} />
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>WCAG 2.1 Compliance Details</CardTitle>
                  <CardDescription>Detailed breakdown of compliance by WCAG criteria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalysisData.categoryBreakdown.map((category) => {
                      const total = category.issues + category.passed
                      const passPercentage = (category.passed / total) * 100

                      return (
                        <div key={category.name} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{category.name}</span>
                            <span className="text-muted-foreground">
                              {category.passed}/{total} ({Math.round(passPercentage)}%)
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${passPercentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
