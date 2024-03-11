import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
export default function Homepage() {
  return (
    <div className="">
      <PageNav />

      <main className="h-screen bg-[#192939] text-white  flex flex-col justify-center items-center">
        <section className="h-[300px] text-center flex flex-col gap-10 items-center justify-around">
          <h1 className="text-4xl font-medium tracking-widest text-[#f1dcbf] md: text-5xl">
            WANDERLOG
          </h1>
          <div className="h-[200px] flex flex-col justify-around items-center">
            <h1>
              You travel the world.
              <br />
              WanderLog keeps track of your adventures.
            </h1>
            <Link
              to="/login"
              className="w-[60%] bg-[#f1dcbf] text-[#192939] font-medium rounded-md py-2 px-4"
            >
              Start Tracking now
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
