"use client";

import { Search, Filter, X } from "lucide-react";
import type { DoctorFilters } from "@/features/doctors/types";
import { useSpecializations, useHospitals } from "@/features/doctors/hooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DoctorFiltersProps {
  filters: DoctorFilters;
  onFilterChange: (filters: DoctorFilters) => void;
}

export function DoctorFiltersBar({
  filters,
  onFilterChange,
}: DoctorFiltersProps) {
  const { data: specializations = [] } = useSpecializations();
  const { data: hospitals = [] } = useHospitals();

  const update = (key: keyof DoctorFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.search ||
    (filters.specialization && filters.specialization !== "all") ||
    (filters.hospital && filters.hospital !== "all") ||
    filters.dateFrom ||
    filters.dateTo;

  const clearFilters = () => {
    onFilterChange({
      search: "",
      specialization: "all",
      hospital: "all",
      dateFrom: "",
      dateTo: "",
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters</span>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto h-7 text-xs gap-1 text-muted-foreground"
          >
            <X className="w-3 h-3" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <div className="space-y-1.5">
          <Label className="text-xs">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Name, email, phone..."
              value={filters.search}
              onChange={(e) => update("search", e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Specialization</Label>
          <Select
            value={filters.specialization || "all"}
            onValueChange={(v) => update("specialization", v ?? "all")}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All specializations</SelectItem>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Hospital</Label>
          <Select
            value={filters.hospital || "all"}
            onValueChange={(v) => update("hospital", v ?? "all")}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All hospitals</SelectItem>
              {hospitals.map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">From date</Label>
          <Input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => update("dateFrom", e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">To date</Label>
          <Input
            type="date"
            value={filters.dateTo}
            onChange={(e) => update("dateTo", e.target.value)}
            className="h-9 text-sm"
          />
        </div>
      </div>
    </Card>
  );
}
