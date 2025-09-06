"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from "recharts"
import { Eye, Hand, Brain, Cog, ChevronDown, ChevronRight } from "lucide-react"

interface CategoryData {
  name: string
  issues: number
  passed: number
}

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

interface CategoryBreakdownProps {
  categoryData: CategoryData[]
  issues: Issue[]
}

const categoryIcons = {
  Perceivable: Eye,
  Operable: Hand,
  Understandable: Brain,
  Robust: Cog,
}

const categoryDescriptions = {
  Perceivable: "Information and UI components must be presentable to users in ways they can perceive",
  Operable: "UI components and navigation must be operable by all users",
  Understandable: "Information and UI operation must be understandable to users",
  Robust: "Content must be robust enough for interpretation by assistive technologies",
}

const severityColors = {
  Critical: "#be123c",
  Serious: "#f97316",
  Moderate: "#eab308",
  Minor: "#22c55e",
}

export function CategoryBreakdown({ categoryData, issues }: CategoryBreakdownProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName)
    } else {
      newExpanded.add(categoryName)
    }
    setExpandedCategories(newExpanded)
  }

  const getIssuesForCategory = (categoryName: string) => {
    return issues.filter((issue) => issue.category === categoryName)
  }

  const getSeverityBreakdownForCategory = (categoryName: string) => {
    const categoryIssues = getIssuesForCategory(categoryName)
    const severityCount = categoryIssues.reduce(
      (acc, issue) => {
        acc[issue.severity] = (acc[issue.severity] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(severityCount).map(([severity, count]) => ({
      name: severity,
      value: count,
      color: severityColors[severity as keyof typeof severityColors],
    }))
  }

  const chartConfig = {
    issues: {
      label: "Issues",
      color: "hsl(var(--chart-4))",
    },
    passed: {
      label: "Passed",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <div className="space-y-6">
      {/* Category Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>WCAG Categories Overview</CardTitle>
          <CardDescription>Issues and passed rules by WCAG principle</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px]">
            <BarChart data={categoryData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="issues" fill="hsl(var(--chart-4))" name="Issues" radius={[0, 0, 4, 4]} />
              <Bar dataKey="passed" fill="hsl(var(--chart-1))" name="Passed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Detailed Category Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Category Details</h3>
        {categoryData.map((category) => {
          const Icon = categoryIcons[category.name as keyof typeof categoryIcons]
          const isExpanded = expandedCategories.has(category.name)
          const categoryIssues = getIssuesForCategory(category.name)
          const severityBreakdown = getSeverityBreakdownForCategory(category.name)
          const total = category.issues + category.passed
          const passPercentage = (category.passed / total) * 100

          return (
            <Card key={category.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {categoryDescriptions[category.name as keyof typeof categoryDescriptions]}
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toggleCategory(category.name)}>
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Category Summary */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-destructive">{category.issues}</div>
                      <p className="text-sm text-muted-foreground">Issues</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{category.passed}</div>
                      <p className="text-sm text-muted-foreground">Passed</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{Math.round(passPercentage)}%</div>
                      <p className="text-sm text-muted-foreground">Compliance</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Compliance Progress</span>
                      <span>
                        {category.passed}/{total}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${passPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="space-y-4 pt-4 border-t">
                      {/* Severity Breakdown Chart */}
                      {severityBreakdown.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Severity Breakdown</h4>
                            <ChartContainer config={chartConfig} className="aspect-square max-h-[200px]">
                              <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie
                                  data={severityBreakdown}
                                  dataKey="value"
                                  nameKey="name"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={60}
                                  fill="#8884d8"
                                >
                                  {severityBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ChartContainer>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Issues in this Category</h4>
                            <div className="space-y-2">
                              {categoryIssues.slice(0, 3).map((issue) => (
                                <div key={issue.id} className="flex items-center justify-between p-2 bg-muted rounded">
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{issue.rule}</p>
                                    <p className="text-xs text-muted-foreground truncate">{issue.description}</p>
                                  </div>
                                  <Badge variant={issue.severity === "Critical" ? "destructive" : "secondary"}>
                                    {issue.severity}
                                  </Badge>
                                </div>
                              ))}
                              {categoryIssues.length > 3 && (
                                <p className="text-xs text-muted-foreground text-center">
                                  +{categoryIssues.length - 3} more issues
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
