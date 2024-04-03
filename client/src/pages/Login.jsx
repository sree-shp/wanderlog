import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password, setLoading, setError);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated]
  );
  return (
    <>
      {loading && (
        <Modal>
          <div className="">Loading ...</div>
        </Modal>
      )}
      {error && (
        <Modal>
          <div className="">{error}</div>
        </Modal>
      )}

      <PageNav />
      <div className="px-5">
        <main className=" my-[5rem] mx-auto rounded-lg  w-[100%] max-w-[350px] md:max-w-[650px] flex flex-col md:flex-row md:justify-stretch justify-center items-center bg-[#303e4d] text-white">
          <section className=" text-center w-full flex flex-col gap-5 items center md:w-[50%] md:h-[400px] md:rounded-md rounded-t-md  justify-center bg-[url('login-img.jpg')] bg-fit bg-no-repeat bg-top px-5 py-5">
            <h1 className=" text-4xl font-bold tracking-widest text-[#f1dcbf]">
              WANDERLOG
            </h1>
            <p className=" text-[#f1dcbf] text-lg font-normal hidden md:block">
              Ready to embark on another adventure? Log in now and let's pick up
              where you left off.
            </p>
          </section>
          <form
            className="flex flex-col gap-5 items-center w-[75%] md:w-[100%] md:max-w-[300px] max-w-[250px] mx-5 my-5 md:px-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="email" className="text-[#f1dcbf]">
                Email address
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email Address"
                className="rounded-md px-2 py-2 !text-black "
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label htmlFor="password" className="text-[#f1dcbf]">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                className="rounded-md px-2 py-2 !text-black "
              />
            </div>

            <div className="w-full my-2 ">
              <button className="w-full font-medium bg-[#f1dcbf] text-[#192939] px-1 py-2 rounded-md">
                Login
              </button>
            </div>
            <Link to="/signup" className="pb-5">
              <div className="text-[#f1dcbf]">
                If you do not have an account, Signup
              </div>
            </Link>
          </form>
        </main>
      </div>
    </>
  );
}
