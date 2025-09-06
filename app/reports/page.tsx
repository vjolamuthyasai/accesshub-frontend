import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
import { ReportsManager } from "@/components/reports-manager"

export default function ReportsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Generate and download accessibility analysis reports in various formats
            </p>
          </div>
          <ReportsManager />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
