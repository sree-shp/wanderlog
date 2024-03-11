import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WanderLog logo" className="w-[100px]" />
    </Link>
  );
}

export default Logo;
