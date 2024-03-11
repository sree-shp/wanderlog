import AppNav from "./AppNav";
import Logo from "./Logo.jsx";
import { Outlet } from "react-router-dom";

function Sidebar({ handleClick }) {
  return (
    <div className="w-full py-4 relative h-[500px] z-[1000] bg-[#192939] rounded-2xl mx-2 flex flex-col  md:w-[100%] md:mx-0 md: rounded-none md:h-screen">
      <div className="sticky top-0 flex justify-between items-center">
        <div className="flex md:justify-center w-full">
          <Logo />
        </div>
        <div
          className="text-3xl text-white mr-7 md:mr-5 md:hidden"
          onClick={handleClick}
        >
          &times;
        </div>
      </div>
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-10 overflow-auto">
          <AppNav />
          <Outlet />
        </div>

        <footer className="text-center text-white">
          <p className="">
            &copy; Copyright {new Date().getFullYear()} by WanderLog Inc.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Sidebar;
