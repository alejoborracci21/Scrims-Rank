import Navbar from "@/app/components/navbar";
import background from "@/../public/rules.jpg"; // Asegúrate de que la ruta sea correcta

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
      ></div>
    </>
  );
}
