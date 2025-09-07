import { Pagination as PaginationRoot, PaginationContent, PaginationLink } from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import type { PagingDTO } from "@/types/default";

interface PaginationProps {
  paging: PagingDTO;
}

export const Pagination = ({ paging }: PaginationProps) => {
  const [_, setSearchParams] = useSearchParams();

  const firstPage = () => {
    setSearchParams((params) => {
      params.set("offset", "1");
      return params;
    });
  };

  const previousPage = () => {
    if (Number(paging.currentPage) - 1 <= 0) return;

    setSearchParams((params) => {
      params.set("offset", String(paging.currentPage - 1));
      return params;
    });
  };

  const nextPage = () => {
    if (Number(paging.currentPage) > paging.totalPages) return;

    setSearchParams((params) => {
      params.set("offset", String(paging.currentPage + 1));
      return params;
    });
  };

  const lastPage = () => {
    setSearchParams((params) => {
      params.set("offset", String(paging.totalPages));
      return params;
    });
  };

  return (
    <PaginationRoot>
      <PaginationContent>
        <span className="text-sm font-medium mr-3">
          Página {paging.currentPage} de {paging.totalPages}
        </span>
        <PaginationLink onClick={firstPage} disabled={Number(paging.currentPage) <= 1} className="hover:bg-zinc-300 size-8 rounded cursor-pointer">
          <ChevronsLeft />
        </PaginationLink>
        <PaginationLink onClick={previousPage} disabled={Number(paging.currentPage) <= 1} className="hover:bg-zinc-300 size-8 rounded cursor-pointer">
          <ChevronLeft className="size-4" />
        </PaginationLink>
        <PaginationLink onClick={nextPage} disabled={Number(paging.currentPage) >= paging.totalPages} className="hover:bg-zinc-300 size-8 rounded cursor-pointer">
          <ChevronRight className="size-4" />
        </PaginationLink>
        <PaginationLink onClick={lastPage} disabled={Number(paging.currentPage) >= paging.totalPages} className="hover:bg-zinc-300 size-8 rounded cursor-pointer">
          <ChevronsRight className="size-4" />
        </PaginationLink>
      </PaginationContent>
    </PaginationRoot>
  );
};
