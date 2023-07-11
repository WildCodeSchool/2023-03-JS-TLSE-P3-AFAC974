import { useState, useEffect } from "react";
import axios from "axios";
import regularLogo from "../assets/logo_regular.png";

export default function About() {
  const [isClicked, setIsClicked] = useState(false);
  const [emailAdmin, setEmailAdmin] = useState("");

  useEffect(() => {
    try {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/findadmin`).then((res) => {
        const data = res.data[0];
        setEmailAdmin(data[0].email);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex flex-col justify-evenly items-center md:mt-20md:h-screen">
      <img src={regularLogo} alt="afac_logo" className="mt-14" />
      <h2 className="font-bold my-6 text-[#275492] text-3xl drop-shadow-xl md:text-[35px]">
        Qui sommes-nous ?
      </h2>
      <p className="w-[90%] text-left text-[18px] md:w-[70%]">
        Nous sommes un collectif de passionnés de la culture réunionaise et de
        son histoire, rassemblé dans une association loi 1901. Nous effectuons
        un devoir de mémoire en conservant les oeuvres de notre patrimoine
        historique, et nous souhaitons partager notre passion au travers de ce
        site afin que vous puissiez découvrir et apprécier l'histoire de notre
        île.
      </p>
      <h2 className="font-bold my-6 text-[#275492] text-3xl drop-shadow-xl md:text-[35px]">
        Nos Partenaires
      </h2>
      <ul>
        <li>
          <p className="text-[18px]">La plateforme pédagogique :</p>
          <a
            href="https://capeline.re/"
            className="text-[#275492] text-[18px] font-bold md:text-[21px]"
          >
            Capeline.re
          </a>
        </li>
        <li>
          <p className="text-[18px] mt-3">Site Objet Témoin :</p>
          <a
            href="https://museo.vandanjon.com/index.php/en/"
            className="text-[#275492] text-[18px] font-bold md:text-[21px]"
          >
            Objet Témoin
          </a>
        </li>
        <li>
          <p className="text-[18px] mt-3">
            Iconothèque Historique de l'océan Indien :
          </p>
          <a
            href="https://www.ihoi.org/app/photopro.sk/ihoi_icono/"
            className="text-[#275492] text-[18px] font-bold md:text-[21px]"
          >
            I.H.O.I.
          </a>
        </li>
      </ul>
      <h1 className="font-bold my-6 text-red-600 text-3xl drop-shadow-xl md:text-[35px]">
        RAPPEL
      </h1>
      <div className="border-red-600 bg-red-100 border-4 border-solid rounded w-[95%] flex justify-center items-center md:w-[70%] mb-6">
        <p className="text-red-600 text-[18px] p-2 md:text-[21px]">
          Toutes les oeuvres présentes sur ce site ne sont pas libres de droits
          et sont la propriété exclusive de leur(s) auteur(s).
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="font-bold my-6 text-2xl drop-shadow-xl">
          Déclaration de Conformité RGPD
        </h3>
        <button
          type="button"
          className="bg-transparent shadow-xl hover:bg-[#275492] text-[#275492] font-semibold hover:text-white py-2 px-4 border border-[#275492] hover:border-transparent rounded mb-5 md:text-[21px]"
          onClick={() => setIsClicked(!isClicked)}
        >
          {isClicked ? "En savoir moins " : "En savoir plus"}
        </button>
        {isClicked && (
          <p className="text-[18px] text-left p-2 mb-6 w-[90%] md:w-[70%]">
            Nous, <b>AFAC 974</b>, souhaitons vous informer que nous traitons
            vos données personnelles conformément au Règlement Général sur la
            Protection des Données (RGPD). Lorsque vous vous inscrivez sur notre
            site, nous collectons et utilisons les informations que vous nous
            fournissez dans le but de créer et de gérer votre compte
            d'utilisateur. Nous utilisons également des cookies pour
            authentifier votre session et vous permettre de naviguer sur notre
            site de manière sécurisée et personnalisée. Ces cookies sont
            essentiels pour assurer le bon fonctionnement de notre site et pour
            vous offrir une expérience de navigation améliorée. Nous ne
            partageons pas vos données avec des tiers à des fins commerciales et
            nous les conservons uniquement pendant la durée nécessaire pour
            fournir nos services. Vous avez le droit de demander l'accès, la
            rectification ou la suppression de vos données personnelles. Vous
            pouvez également vous opposer au traitement de vos données ou
            demander la limitation de leur utilisation. Pour exercer ces droits
            ou pour toute question concernant notre politique de
            confidentialité, veuillez nous contacter à l'adresse{" "}
            <u>{emailAdmin}</u>. Nous nous engageons à protéger vos données
            personnelles et à respecter vos droits conformément aux dispositions
            du RGPD.
          </p>
        )}
      </div>
    </div>
  );
}
