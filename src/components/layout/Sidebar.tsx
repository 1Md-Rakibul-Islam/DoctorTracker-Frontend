"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  LayoutDashboard,
  Stethoscope,
  Users,
  LogOut,
  Menu,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/patients", label: "Patients", icon: Users },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1.5">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-sidebar-foreground/80 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground",
            )}
          >
            <Icon className="w-4.5 h-4.5 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function DesktopBrand() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5 px-2">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground shrink-0">
        <Activity className="w-5 h-5" />
      </div>
      <span className="text-base font-bold text-sidebar-foreground tracking-tight">
        Doctor Tracker
      </span>
    </Link>
  );
}

function MobileBrand() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5 px-2">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground shrink-0">
        <Activity className="w-5 h-5" />
      </div>
      <SheetTitle className="text-base font-bold text-sidebar-foreground tracking-tight">
        Doctor Tracker
      </SheetTitle>
    </Link>
  );
}

function UserSection({ onLogout }: { onLogout: () => void }) {
  const { user } = useAuth();
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p: string) => p[0])
        .join("")
        .slice(0, 2)
    : "AD";

  return (
    <div className="flex items-center gap-3 px-2 py-2">
      <Avatar className="w-9 h-9 border-2 border-sidebar-foreground/20">
        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-sidebar-foreground truncate">
          {user?.name || "Admin"}
        </p>
        <p className="text-xs text-sidebar-foreground/60 truncate">
          {user?.email}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onLogout}
        className="text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-foreground/10 h-8 w-8"
        aria-label="Log out"
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function Sidebar() {
  const router = useRouter();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-sidebar text-sidebar-foreground">
        <div className="flex items-center h-16 px-4 border-b border-sidebar-foreground/10">
          <DesktopBrand />
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <p className="px-3 text-xs font-medium text-sidebar-foreground/40 uppercase tracking-wider mb-2">
            Menu
          </p>
          <NavLinks />
        </div>
        <Separator className="bg-sidebar-foreground/10" />
        <div className="p-3">
          <UserSection onLogout={handleLogout} />
        </div>
      </aside>

      {/* Mobile Header with Sheet trigger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 bg-sidebar text-sidebar-foreground border-b border-sidebar-foreground/10">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-base font-bold tracking-tight">
            Doctor Tracker
          </span>
        </div>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-sidebar-foreground/10"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 p-0 bg-sidebar text-sidebar-foreground border-sidebar-foreground/10 [&>button]:text-sidebar-foreground [&>button]:opacity-100"
          >
            <div className="flex items-center h-16 px-4 border-b border-sidebar-foreground/10 justify-between">
              <MobileBrand />
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <p className="px-3 text-xs font-medium text-sidebar-foreground/40 uppercase tracking-wider mb-2">
                Menu
              </p>
              <NavLinks onNavigate={() => setMobileOpen(false)} />
            </div>
            <Separator className="bg-sidebar-foreground/10" />
            <div className="p-3">
              <UserSection onLogout={handleLogout} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
