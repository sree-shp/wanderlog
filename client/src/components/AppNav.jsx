import { useState } from "react";
import { NavLink } from "react-router-dom";

function AppNav() {
  const [select, setSelect] = useState("cities");
  return (
    <nav className=" flex justify-center ">
      <ul className="bg-white w-[60%] flex flex-row rounded-md ">
        <NavLink
          className={`w-[100%] flex justify-center bg-white rounded-md py-1 ${
            select === "cities" ? "!bg-[#f1dcbf] " : ""
          }`}
          to="cities"
          onClick={() => setSelect("cities")}
        >
          Cities
        </NavLink>

        <NavLink
          className={`w-[100%] flex justify-center bg-white rounded-md py-1 ${
            select === "countries" ? "!bg-[#f1dcbf] " : ""
          }`}
          to="countries"
          onClick={() => setSelect("countries")}
        >
          Countries
        </NavLink>
      </ul>
    </nav>
  );
}

export default AppNav;
