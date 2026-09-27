"use client";

import { Search, Filter, X } from "lucide-react";
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
import { IPatientFilters } from "../types";

interface PatientFiltersProps {
  filters: IPatientFilters;
  onFilterChange: (filters: IPatientFilters) => void;
}

const conditions = ["Critical", "Serious", "Fair", "Stable", "Good"];

import { useDoctors } from "@/features/doctors/hooks";

export function PatientFiltersBar({
  filters,
  onFilterChange,
}: PatientFiltersProps) {
  const { data: doctorsDataRes } = useDoctors(1, 100, {
    search: "",
    specialization: "all",
    hospital: "all",
    dateFrom: "",
    dateTo: "",
  });
  const doctorsData = doctorsDataRes?.data || [];

  const update = (key: keyof IPatientFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.search ||
    (filters.condition && filters.condition !== "all") ||
    (filters.gender && filters.gender !== "all") ||
    (filters.doctorId && filters.doctorId !== "all") ||
    filters.dateFrom ||
    filters.dateTo;

  const clearFilters = () => {
    onFilterChange({
      search: "",
      condition: "all",
      gender: "all",
      doctorId: "all",
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

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="space-y-1.5">
          <Label className="text-xs">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Name, diagnosis..."
              value={filters.search}
              onChange={(e) => update("search", e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Condition</Label>
          <Select
            value={filters.condition || "all"}
            onValueChange={(v) => update("condition", v)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All conditions</SelectItem>
              {conditions.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Gender</Label>
          <Select
            value={filters.gender || "all"}
            onValueChange={(v) => update("gender", v)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All genders</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Doctor</Label>
          <Select
            value={filters.doctorId || "all"}
            onValueChange={(v) => update("doctorId", v)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All doctors</SelectItem>
              {doctorsData?.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.name}
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
