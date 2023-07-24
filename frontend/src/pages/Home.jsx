import { Link } from "react-router-dom";
import GalleryButton from "../components/GalleryButton";

export default function Home() {
  return (
    <div className=" mt-[52px] lg:mt-[60px] bg-cover z-0 bg-no-repeat bg-center opacity-95 custom-bg overflow-y-hidden">
      <div className="h-full flex flex-col  justify-between items-center h-screen-minus-navbar  py-[20%] md:py-[32px]">
        <div className="flex flex-col justify-between h-[60%] md:h-[45%] ">
          <h1 className="font-bold text-white text-3xl md:text-4xl drop-shadow-[4px_4px_4px_#222] md:mt-[32px]">
            Bienvenue à l'AFAC
          </h1>
          <div className="flex flex-col md:flex-row gap-5 md:gap-20 text-white text-xl md:text-3xl drop-shadow-[3px_3px_3px_#222]">
            <h3>Éducation</h3>
            <h3>Culture</h3>
            <h3>Patrimoine</h3>
          </div>
        </div>
        <div className="">
          <Link to="/gallery">
            <GalleryButton />
          </Link>
        </div>
      </div>
    </div>
  );
}
