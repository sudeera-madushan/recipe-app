import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-body">
      <div className="m-auto w-full max-w-[480px] rounded-xl bg-secondary sm:p-8 sm:shadow-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
