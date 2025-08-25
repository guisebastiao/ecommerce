import type { ProductQueryParams } from "@/types/productTypes";
import { useSearchParams } from "react-router-dom";
import type { PagingDTO } from "@/types/default";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  paging: PagingDTO;
}

export const Pagination = ({ paging }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams.entries()) as {
    [K in keyof ProductQueryParams]: string;
  };

  const firstPage = () => {
    setSearchParams((params) => {
      params.set("offset", "1");
      return params;
    });
  };

  const previousPage = () => {
    if (Number(params.offset) - 1 <= 0) return;

    setSearchParams((params) => {
      params.set("offset", String(paging.currentPage - 1));
      return params;
    });
  };

  const nextPage = () => {
    if (Number(params.offset) > paging.totalPages) return;

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
        <PaginationLink
          onClick={firstPage}
          disabled={Number(params.offset) <= 1}
          className="hover:bg-zinc-300 size-8 rounded cursor-pointer"
        >
          <ChevronsLeft />
        </PaginationLink>
        <PaginationLink
          onClick={previousPage}
          disabled={Number(params.offset) <= 1}
          className="hover:bg-zinc-300 size-8 rounded cursor-pointer"
        >
          <ChevronLeft className="size-4" />
        </PaginationLink>
        <PaginationLink
          onClick={nextPage}
          disabled={Number(params.offset) >= paging.totalPages}
          className="hover:bg-zinc-300 size-8 rounded cursor-pointer"
        >
          <ChevronRight className="size-4" />
        </PaginationLink>
        <PaginationLink
          onClick={lastPage}
          disabled={Number(params.offset) >= paging.totalPages}
          className="hover:bg-zinc-300 size-8 rounded cursor-pointer"
        >
          <ChevronsRight className="size-4" />
        </PaginationLink>
      </PaginationContent>
    </PaginationRoot>
  );
};
