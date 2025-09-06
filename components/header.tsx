"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const getBreadcrumbs = () => {
    switch (pathname) {
      case "/":
        return { parent: null, current: "Dashboard" }
      case "/analyze":
        return { parent: { name: "Dashboard", href: "/" }, current: "New Analysis" }
      case "/results":
        return { parent: { name: "Dashboard", href: "/" }, current: "Results" }
      case "/reports":
        return { parent: { name: "Dashboard", href: "/" }, current: "Reports" }
      case "/history":
        return { parent: { name: "Dashboard", href: "/" }, current: "History" }
      case "/settings":
        return { parent: { name: "Dashboard", href: "/" }, current: "Settings" }
      default:
        if (pathname.startsWith("/results/")) {
          return { parent: { name: "Results", href: "/results" }, current: "Analysis Details" }
        }
        return { parent: null, current: "Dashboard" }
    }
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.parent && (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={breadcrumbs.parent.href}>{breadcrumbs.parent.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{breadcrumbs.current}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
