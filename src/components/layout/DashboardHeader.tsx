"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function getPageTitle(pathname: string): { title: string; subtitle: string } {
  if (pathname === "/dashboard") {
    return {
      title: "Dashboard",
      subtitle: "Overview of your medical practice",
    };
  }
  if (pathname === "/doctors") {
    return { title: "Doctors", subtitle: "Manage all registered doctors" };
  }
  if (pathname.startsWith("/doctors/create")) {
    return { title: "Add New Doctor", subtitle: "Register a new doctor" };
  }
  if (pathname.match(/^\/doctors\/[^/]+$/)) {
    return {
      title: "Doctor Details",
      subtitle: "View doctor and patient information",
    };
  }
  if (pathname === "/patients") {
    return { title: "Patients", subtitle: "Manage all registered patients" };
  }
  if (pathname.match(/^\/patients\/[^/]+$/)) {
    return {
      title: "Patient Details",
      subtitle: "View and edit patient information",
    };
  }
  return { title: "Doctor Tracker", subtitle: "Administrative Portal" };
}

export function DashboardHeader() {
  const pathname = usePathname();
  const { title, subtitle } = getPageTitle(pathname);

  return (
    <header className="sticky top-16 lg:top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 lg:px-6 transition-all duration-200">
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-semibold tracking-tight truncate">
          {title}
        </h1>
        <p className="text-xs text-muted-foreground truncate hidden sm:block">
          {subtitle}
        </p>
      </div>
      <div className="hidden md:flex items-center relative w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Quick search..."
          className="pl-9 h-9 bg-muted/50 border-transparent focus-visible:border-border"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] p-0 flex items-center justify-center">
          3
        </Badge>
      </Button>
    </header>
  );
}
