import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { AnalysisHistory } from "@/components/analysis-history"

export default function HistoryPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Analysis History</h1>
            <p className="text-muted-foreground">View and manage your previous accessibility analyses</p>
          </div>
          <AnalysisHistory />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
