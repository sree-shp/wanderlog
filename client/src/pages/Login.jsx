import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated]
  );
  return (
    <>
      <PageNav />

      <main className="h-screen flex flex-col justify-center items-center bg-[#192939] text-white">
        <h1 className="text-4xl font-medium tracking-widest text-[#f1dcbf] mb-10">
          WANDERLOG
        </h1>
        <form
          className="flex flex-col gap-5 items-center w-[65%] max-w-[250px] mx-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email Address"
              className="rounded-sm px-2 py-2 !text-black "
            />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="rounded-sm px-2 py-2 !text-black"
            />
          </div>

          <div className="w-full mt-5">
            <button className="w-full font-medium text-[#192939] bg-[#f1dcbf] px-1 py-2">
              Login
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
