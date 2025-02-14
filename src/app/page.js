import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard/page";
import AdminPage from "./admin-dashboard/page";

async function Home() {
  
    return (
      <Dashboard />
    );
  

}

export default Home;
