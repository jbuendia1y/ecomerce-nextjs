"use client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { displayPrice } from "@/lib/utils";
import { Product } from "@/modules/products/interfaces";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EditIcon } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    header: "Precio c/u",
    accessorFn: (data) => displayPrice(data.price),
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    header: "Acciones",
    accessorKey: "id",
    cell(ctx) {
      const productId = ctx.cell.getValue() as string;
      return (
        <div className="flex gap-2">
          <Link href={"/admin/products/" + productId}>
            <Button size="icon" variant="ghost">
              <EditIcon />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export const ProductsDataTable = (props: {
  data: Product[];
  currentPage: number;
  totalProducts: number;
  totalPages: number;
}) => {
  const table = useReactTable({
    columns,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: props.totalProducts,
      },
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationPrevious onClick={() => table.previousPage()} />
          {Array.from({ length: props.totalPages }, (_v, idx) => idx + 1).map(
            (pageNumber) => {
              return (
                <PaginationItem key={"admin-products-table-page-" + pageNumber}>
                  <PaginationLink
                    href={`?page=${pageNumber}`}
                    {...(pageNumber === props.currentPage
                      ? { isActive: true }
                      : {})}
                    onClick={() => {
                      table.setPageIndex(pageNumber - 1);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          )}
          <PaginationNext onClick={() => table.nextPage()} />
        </PaginationContent>
      </Pagination>
    </div>
  );
};
