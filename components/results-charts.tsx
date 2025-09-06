"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from "recharts"

interface SeverityData {
  name: string
  value: number
  color: string
}

interface CategoryData {
  name: string
  issues: number
  passed: number
}

interface ResultsChartsProps {
  severityData: SeverityData[]
  categoryData: CategoryData[]
}

export function ResultsCharts({ severityData, categoryData }: ResultsChartsProps) {
  const chartConfig = {
    critical: {
      label: "Critical",
      color: "hsl(var(--chart-4))",
    },
    serious: {
      label: "Serious",
      color: "hsl(var(--chart-3))",
    },
    moderate: {
      label: "Moderate",
      color: "hsl(var(--chart-2))",
    },
    minor: {
      label: "Minor",
      color: "hsl(var(--chart-1))",
    },
  }

  // Transform category data for stacked bar chart
  const categoryChartData = categoryData.map((item) => ({
    name: item.name,
    issues: item.issues,
    passed: item.passed,
    total: item.issues + item.passed,
  }))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Severity Breakdown Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Issues by Severity</CardTitle>
          <CardDescription>Distribution of accessibility issues by severity level</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={severityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* WCAG Categories Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>WCAG Categories</CardTitle>
          <CardDescription>Issues and passed rules by WCAG principle</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[300px]">
            <BarChart data={categoryChartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="issues" stackId="a" fill="hsl(var(--chart-4))" name="Issues" radius={[0, 0, 4, 4]} />
              <Bar dataKey="passed" stackId="a" fill="hsl(var(--chart-1))" name="Passed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Compliance Overview */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Compliance Overview</CardTitle>
          <CardDescription>Pass/fail ratio across all WCAG categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryData.map((category) => {
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
    </div>
  )
}
