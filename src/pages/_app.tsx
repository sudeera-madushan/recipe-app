import Navbar from "@/components/navbar/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideNavbarRoutes = ['/login', '/register'];
  return (
    <>
       {!hideNavbarRoutes.includes(router.pathname) && <Navbar />}
      <Component {...pageProps} />
    </>
  )
}
