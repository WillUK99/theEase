import { useRef } from "react";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const loaded = useRef<boolean>(false)

  if (!loaded.current && typeof window !== 'undefined') {
    injectStyle()
    loaded.current = true
  }

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
