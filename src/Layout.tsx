import MiniNav from "@/components/MiniNav";
import {ReactNode} from "react";

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <MiniNav />
      <div className="flex min-h-full w-full flex-1 flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default Layout;
