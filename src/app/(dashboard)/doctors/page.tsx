"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus, Stethoscope } from "lucide-react";
import type { DoctorFilters } from "@/features/doctors/types";
import { useDoctors } from "@/features/doctors/hooks";
import { DoctorTable } from "@/features/doctors/components/DoctorTable";
import { DoctorFiltersBar } from "@/features/doctors/components/DoctorFilters";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PAGE_SIZE = 8;

export default function DoctorsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<DoctorFilters>({
    search: "",
    specialization: "all",
    hospital: "all",
    dateFrom: "",
    dateTo: "",
  });

  const { data, isLoading } = useDoctors(page, PAGE_SIZE, filters);

  const handleFilterChange = (newFilters: DoctorFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const totalPages = data?.totalPages || 1;
  const currentPage = page;

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">All Doctors</h2>
            <p className="text-sm text-muted-foreground">
              {data ? `${data.total} total doctors` : "Loading..."}
            </p>
          </div>
        </div>
        <Button asChild className="gap-2">
          <Link href="/doctors/create">
            <Plus className="w-4 h-4" />
            Add New Doctor
          </Link>
        </Button>
      </div>

      <DoctorFiltersBar filters={filters} onFilterChange={handleFilterChange} />

      <Card>
        {isLoading ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : (
          <>
            <DoctorTable doctors={data?.data || []} />
            {data && data.total > PAGE_SIZE && (
              <div className="border-t p-4">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                    {pageNumbers.map((pageNum) => (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          isActive={pageNum === currentPage}
                          onClick={() => setPage(pageNum)}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setPage((p) => Math.min(totalPages, p + 1))
                          }
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
}
