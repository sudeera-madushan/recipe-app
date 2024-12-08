"use client";
import React from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import logout from "../../../public/logout.png";
import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import { useRouter } from "next/router";
const Navbar = () => {
  const [isClick, setIsClick] = React.useState(false);
  const router = useRouter();
  const toggleNavbar = () => {
    setIsClick(!isClick);
  };

  const  handleLogout = async () => {
    Cookies.remove("token");
    Router.reload();
  };
  return (
    <>
      <nav className="transition-all ease-in duration-300 lg:py-2 bg-secondary">
        <div className="max-w-7xl mx-auto max-sm:px-4 sm:px-6 xl:px-0 lg:px-6 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="">
                  <Image src={logo} alt="logo" width={120} height={40} />
                </Link>
              </div>
            </div>
            <div className="hidden md:block ">
              <div className="flex items-center lg:space-x-4 sm:space-x-1 md:me-16">
                <Link
                  href="/"
                  className={`${router.pathname === "/"  || router.pathname === "" || router.pathname === "/home" ? "text-gray-900 " : "font-light"} hover:bg-secondary hover:shadow-lg  px-3 py-1 rounded-3xl sm:text-[10px] lg:text-lg font-semibold duration-300 `}
                >
                  HOME
                </Link>
                <Link
                  href="/favourit"
                  className={`${router.pathname === "/favourit" ? "text-gray-900 " : "font-light"} hover:bg-secondary hover:shadow-lg  px-3 py-1 rounded-3xl sm:text-[10px] lg:text-lg font-semibold duration-300 `}
                >
                  FAVIOURIT
                </Link>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-m"
                onClick={toggleNavbar}
              >
                {isClick ? (
                  <svg
                    className="h-6 w-6 z-50"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="hidden md:block">
              <div className="flex-shrink-0">
                <button className="group" onClick={handleLogout}>
                  <Image
                    src={logout}
                    alt="logout"
                    width={35}
                    height={40}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        {isClick && (
          <div className="md:hidden h-[100vh] w-[40vw] bg-secondary drop-shadow items-end fixed top-0 right-0 pt-12 z-40">
            <div className="px-2 pt-2 pb-3 sm:px-3">
              <Link
                href="/"
                className="border-y justify-between flex hover:bg-gray-300 duration-300 text-gray-900 px-3 py-2 text-base font-medium"
              >
                HOME
              </Link>
              <Link
                href="/"
                className="border-b justify-between flex hover:bg-gray-300 duration-300 text-gray-900 px-3 py-2 text-base font-medium"
              >
                FAVIOURIT
              </Link>
              <button
               onClick={handleLogout}
                className="border-b justify-between flex hover:bg-gray-300 duration-300 text-gray-900 px-3 py-2 text-base font-medium"
              >
                LOGOUT
                <Image
                    src={logout}
                    alt="logout"
                    width={20}
                    height={10}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
