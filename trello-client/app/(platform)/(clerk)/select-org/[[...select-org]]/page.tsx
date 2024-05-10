import { OrganizationList } from "@clerk/nextjs";

export default function CreateOraniizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/organization/:id"}
      afterCreateOrganizationUrl={"/organization/:id"}
    />
  );
}
