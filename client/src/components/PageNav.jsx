import { NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";

function PageNav() {
  const [isActive, setIsActive] = useState(false);
  return (
    <nav className=" w-full py-[1.5rem] bg-[#192939] flex flex-row items-center justify-between md:px-5 lg:px-[4rem] ">
      <Logo />
      <div
        className="relative z-[1000] flex flex-col justify-between gap-1.5 mr-5 md:hidden "
        onClick={() => setIsActive(!isActive)}
      >
        <div
          className={`w-[30px] h-[2.5px] bg-[#f1dcbf] ${
            isActive ? "!bg-[#192939]" : ""
          }`}
        ></div>
        <div
          className={`w-[30px] h-[2.5px] bg-[#f1dcbf] ${
            isActive ? "!bg-[#192939] z" : ""
          }`}
        ></div>
        <div
          className={`w-[30px] h-[2.5px] bg-[#f1dcbf] ${
            isActive ? "!bg-[#192939]" : ""
          }`}
        ></div>
      </div>
      <div
        className={`${
          isActive ? "!block" : ""
        } hidden w-screen h-screen fixed top-0 z-[100] bg-black/[0.4]`}
      ></div>
      <div
        className={`${
          isActive ? "!block" : ""
        } hidden z-[500] fixed top-0 right-0 w-[70%] max-w-[400px] h-screen bg-[#f1dcbf] md-hidden `}
      >
        <ul className="flex flex-col gap-5 mt-[6rem] mx-[1.5rem] text-[#192939]">
          <li className="text-md font-medium">
            Welcome,
            <br /> To Access Your Account,
            <br />
            <div className="my-2 w-full">
              <NavLink
                to="/login"
                className="bg-[#192939] text-[#f1dcbf] flex justify-center rounded-md px-4 py-2"
              >
                Login
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
      <ul className=" hidden md:flex md:flex-row md:gap-10 md:mr-5 text-[#f1dcbf] lg:flex">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/login" className="">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
