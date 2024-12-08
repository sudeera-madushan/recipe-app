import Image from "next/image";
import localFont from "next/font/local";
import Cookies from "js-cookie";
import Router from "next/router";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>Home
    <button onClick={() => 
      {
        Cookies.remove("token");
        Router.push("/login")
      }
    }>Logout</button>
    </>
  );
}
