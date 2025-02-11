"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { getProducts } from "@/modules/products/services/getProducts";
import { getPaginateParams } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ProductsCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("q");
  const { data: page, isLoading } = useQuery({
    queryKey: ["products", searchTerm, searchParams],
    queryFn: () => {
      const pageParams = getPaginateParams(searchParams);

      return getProducts({
        search: searchTerm,
        page: pageParams.page,
        limit: 20,
      });
    },
  });

  const handleChangePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${pageNumber}`);
    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center max-w-5xl mx-auto pt-3">
        <p className="w-full">
          {page?.meta.pagination.total ?? 0} productos encontrados
        </p>
        <Pagination className="max-w-max">
          <PaginationContent>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                const pageNumber = page?.meta.pagination.page ?? 0;
                if (pageNumber === 0) return;
                handleChangePage(pageNumber - 1);
              }}
            />
            {Array.from(
              { length: page?.meta.pagination.pageCount ?? 1 },
              (_v, idx) => idx + 1
            ).map((pageNumber) => {
              return (
                <PaginationItem
                  key={"store-products-catalog-page-" + pageNumber}
                >
                  <PaginationLink
                    href="#"
                    {...(pageNumber === (page?.meta.pagination.page ?? 1)
                      ? { isActive: true }
                      : {})}
                    onClick={(e) => {
                      e.preventDefault();
                      handleChangePage(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                const pageNumber = page?.meta.pagination.page ?? 0;
                if (pageNumber === page?.meta.pagination.pageCount) return;
                handleChangePage(pageNumber + 1);
              }}
            />
          </PaginationContent>
        </Pagination>
      </div>
      <div className="flex flex-row flex-wrap gap-6 py-6 max-w-5xl min-h-32 mx-auto">
        {isLoading && (
          <div className="grid w-full h-80 place-content-center bg-slate-400 animate-pulse rounded-md">
            <h3 className="flex items-center gap-3 text-2xl">
              <Loader2 className="animate-spin" size="30px" />
              Encontrando productos
            </h3>
          </div>
        )}
        {page?.data.map((product) => {
          return (
            <ProductCard
              key={"store-catalog-product-" + product.id}
              image={product.image.url}
              name={product.name}
              slug={product.slug}
              id={product.id}
              price={product.price}
              stock={product.stock}
            />
          );
        })}
      </div>
    </div>
  );
}
