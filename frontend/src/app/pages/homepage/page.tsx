import Navbar from "@/app/components/navbar";
import background from "@/../public/homepage.webp"; // Asegúrate de que la ruta sea correcta

export default function Homepage() {
  return (
    <>
      <Navbar />
      <div
        className="flex flex-col h-[100vh] w-[100%]"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-center items-center mt-[8%] bg">
          <div className="grid grid-cols-2 gap-24">
            <div className=" bg-opacity-90 w-[600px] h-[300px] rounded shadow-lg bg-slate-800"></div>
            <div className=" bg-opacity-90 w-[600px] h-[300px] rounded shadow-lg bg-slate-800"></div>
            <div className=" bg-opacity-90 w-[600px] h-[300px] rounded shadow-lg bg-slate-800"></div>
            <div className=" bg-opacity-90 w-[600px] h-[300px] rounded shadow-lg bg-slate-800"></div>
          </div>
        </div>
      </div>
    </>
  );
}
