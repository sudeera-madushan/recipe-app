import Navbar from "@/components/navbar/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideNavbarRoutes = ["/login", "/register"];
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {!hideNavbarRoutes.includes(router.pathname) && <Navbar />}
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </>
  );
}
