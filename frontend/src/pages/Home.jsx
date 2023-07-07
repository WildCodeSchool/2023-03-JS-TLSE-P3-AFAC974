import { Link } from "react-router-dom";
import GalleryButton from "../components/GalleryButton";

export default function Home() {
  return (
    <div
      className="h-screen w-[100%] relative bg-cover z-0 bg-no-repeat bg-center opacity-95"
      style={{ backgroundImage: "url('../src/assets/bg_home.jpg')" }}
    >
      <div className="flex flex-col h-[100%] justify-center items-center gap-28 md:gap-48">
        <h1 className="font-bold mt-14 text-white text-4xl drop-shadow-[5px_5px_5px_#222] md:text-[53px] md:mt-10">
          Bienvenue à l'AFAC
        </h1>
        <div className="flex flex-col justify-around h-[20%] font-semibold text-white text-3xl drop-shadow-[5px_5px_3px_#222] md:text-[42px] lg:flex lg:flex-row lg:justify-between lg:w-[40%] lg:items-center lg:text-[42px] lg:h-[5%]">
          <h3>Éducation</h3>
          <h3>Culture</h3>
          <h3>Patrimoine</h3>
        </div>
        <div className="flex justify-center h-[40px] mt-4">
          <Link to="/gallery">
            <GalleryButton />
          </Link>
        </div>
      </div>
    </div>
  );
}
