import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

function AppLayout() {
  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className="hidden md:flex md:w-[35%]">
        <Sidebar />
      </div>
      <Map />
      {/* <User /> */}
    </div>
  );
}

export default AppLayout;
