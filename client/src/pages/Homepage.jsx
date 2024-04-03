import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <div className=" ">
      <PageNav />

      <main className="flex items-center gap-5 py-[4rem] px-5 md:px-[5.25rem] lg:py-[6rem]  relative bg-[#192939] text-white   ">
        <section className="lg:grid lg:grid-cols-2 lg:grid-rows-1 lg:items-center text-center flex flex-col gap-10 items-center justify-center ">
          <h1 className="text-4xl md:text-5xl font-extrabold font-Lato place-self-center">
            YOUR ULTIMATE TRAVEL COMPANION
          </h1>
          <section className="lg:row-span-4 lg:self-center">
            <video
              width="720"
              height="720"
              className="rounded-md"
              autoPlay={true}
              muted
              loop
            >
              <source src="video.mp4" type="video/mp4"></source>
            </video>
          </section>
          <p className="md:w-[75%] text-base md:text-lg place-self-center">
            Track your adventures effortlessly with WanderLog. Say goodbye to
            scattered itineraries and scattered memories—our intuitive platform
            helps you organize every detail of your journey in one place.
          </p>

          <Link
            to="/login"
            className="w-[60%] lg:w-[80%] text-center bg-[#f1dcbf] text-[#192939] font-medium rounded-md py-2 px-4 place-self-center"
          >
            Start Tracking now
          </Link>
        </section>
      </main>
    </div>
  );
}
