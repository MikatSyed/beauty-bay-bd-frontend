"use client";

import { Provider } from "react-redux";
import store from "../redux/store";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
  session: any;

}

const Providers = ({ children, session }: any) => {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </Provider>
  );
};

export default Providers;
