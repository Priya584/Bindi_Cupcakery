import { currentUser } from "@clerk/nextjs/server";
import Header from "../header";
import ReduxProvider from "@/provider";


async function CommonLayout({children}) {
    const user = await currentUser();

    return <div>
        <Header user={JSON.parse(JSON.stringify(user))}/>
        <main>
            <ReduxProvider>{children}</ReduxProvider>
        </main>
    </div>
}

export default CommonLayout;