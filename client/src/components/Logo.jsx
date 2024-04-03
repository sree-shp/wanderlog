import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="flex items-center">
        <img src="/logo.png" alt="WanderLog logo" className="w-[75px]" />
        <h1 className="text-base md:text-[1.75rem] font-medium tracking-widest text-[#f1dcbf] md: text-5xl">
          WANDERLOG
        </h1>
      </div>
    </Link>
  );
}

export default Logo;
