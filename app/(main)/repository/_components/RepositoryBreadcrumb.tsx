import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";
import Link from "next/link";

interface IRepositoryBreadcrumb {
  projName: string;
  projOwner: string;
}

function RepositoryBreadcrumb({ projName, projOwner }: IRepositoryBreadcrumb) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/explore">Explore</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage>
            {projName} / {projOwner}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default RepositoryBreadcrumb;
