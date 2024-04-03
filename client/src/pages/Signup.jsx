import { useState, useEffect } from "react";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup, isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (name && email && password && confirmPassword) {
      signup(name, email, password, confirmPassword, setLoading, setError);
    }
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
          <section className=" text-center w-full flex flex-col gap-5 items center md:w-[50%] md:h-[600px] md:rounded-md rounded-t-md  justify-center bg-[url('login-img.jpg')] bg-fit bg-no-repeat px-5 py-5">
            <h1 className=" text-4xl font-bold tracking-widest text-[#192939] ">
              WANDERLOG
            </h1>
            <p className=" text-[#192939] text-lg font-normal hidden md:block">
              Ready to embark on another adventure? Log in now and let's pick up
              where you left off.
            </p>
          </section>
          <form
            className="flex flex-col gap-5 items-center w-[75%] md:w-[100%] md:max-w-[300px] max-w-[250px] mx-5 my-5 md:px-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="rounded-sm px-2 py-2 !text-black "
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="rounded-sm px-2 py-2 !text-black "
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="rounded-sm px-2 py-2 !text-black"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Password"
                className="rounded-sm px-2 py-2 !text-black"
              />
            </div>

            <div className="w-full mt-5">
              <button className="w-full font-medium text-[#192939] bg-[#f1dcbf] px-1 py-2 rounded-md">
                Signup
              </button>
            </div>
            <Link to="/login" className="">
              <div className="text-[#f1dcbf]">
                If you already have an account, Login
              </div>
            </Link>
          </form>
        </main>
      </div>
    </>
  );
}

export default Signup;
