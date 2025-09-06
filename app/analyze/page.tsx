"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { AnalysisForm } from "@/components/analysis-form"

export default function AnalyzePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="mx-auto max-w-2xl w-full">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Website Accessibility Analysis</h1>
                <p className="text-muted-foreground text-lg">
                  Enter a website URL to perform a comprehensive WCAG compliance analysis
                </p>
              </div>
              <AnalysisForm />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
