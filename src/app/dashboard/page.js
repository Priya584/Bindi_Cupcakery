import MenuHome from "../menu-home/page";






export default async function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-black">Dashboard</h1>
      <MenuHome/>
    </div>
  );
}