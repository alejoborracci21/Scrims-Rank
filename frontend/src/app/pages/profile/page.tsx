import Navbar from "@/app/components/navbar";
import background from "@/../public/profile.jpg"; // Asegúrate de que la ruta sea correcta

export default function Homepage() {
  return (
    <>
      <Navbar />
      <div
        className="flex flex-col h-[150vh] w-[100%]"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </>
  );
}
