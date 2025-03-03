import { StaffUsersDataTable } from "./data-table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getStaffUsers } from "@/modules/users/services/getStaffUsers";
import AddStaffUserModal from "./_components/AddStaffUserModal";

export default async function AdminUsersPage(props: {
  searchParams: Promise<{ page?: string; q?: string; state?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page ?? "1");

  const initialData = (await getStaffUsers({
    page: page,
    limit: 10,
  })) ?? {
    data: [],
    meta: { pagination: { page: 1, pageCount: 1, pageSize: 0, total: 0 } },
  };

  if (!initialData) return <></>;

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">/</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>usuarios</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="px-4">
        <div className="flex justify-between items-end pb-4">
          <div>
            <h1 className="text-2xl font-bold">Usuarios</h1>
            <p>Listado del equipo que emplea el ecomerce</p>
          </div>
          <AddStaffUserModal />
        </div>
        <StaffUsersDataTable
          data={initialData.data}
          currentPage={initialData.meta.pagination.page}
          totalUsers={initialData.meta.pagination.total}
          totalPages={initialData.meta.pagination.pageCount}
        />
      </main>
    </div>
  );
}
