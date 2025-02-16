import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Menu from "../menu/page";





export default async function AdminPage() {
  const user = await currentUser();
  const role = user?.publicMetadata?.role ?? undefined;


  if (role !== "admin") {
    redirect("/");
  }

  return (
    <div>
      <Menu/>
    </div>
  );
}