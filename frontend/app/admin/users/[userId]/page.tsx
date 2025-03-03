import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import EditStaffUserForm from "./_components/EditStaffUserForm";
import { getStaffUserDetails } from "@/modules/users/services/getStaffUserDetails";
import RevokeStaffUserButton from "./_components/RevokeStaffUserButton";

export default async function EditStaffUserPage(props: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await props.params;

  const user = await getStaffUserDetails(userId);
  if (!user) return <></>;

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
                <BreadcrumbLink href="/admin/users">usuarios</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>{user.id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="px-4">
        <div className="flex justify-between items-end pb-4">
          <div>
            <h1 className="text-2xl font-bold">Editar usuario</h1>
            <p>
              Formulario para editar la información del usuario del equipo del
              ecomerce
            </p>
          </div>
          <RevokeStaffUserButton userId={user.id} />
        </div>
        <EditStaffUserForm defaultValues={user} />
      </main>
    </div>
  );
}
