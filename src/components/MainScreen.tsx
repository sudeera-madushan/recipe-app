import React from "react";

const MainScreen = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-body min-h-screen">
      <section className="flex flex-col justify-center sm:px-5">
        <div className="lg:max-w-[1280px] justify-center w-full mx-auto ">
          {children}
        </div>
      </section>
    </div>
  );
};

export default MainScreen;
