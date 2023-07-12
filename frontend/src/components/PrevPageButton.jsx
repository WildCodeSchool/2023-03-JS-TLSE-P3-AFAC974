import { useNavigate } from "react-router-dom";
import prev from "../assets/prev.png";

export default function PrevPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={handleGoBack}
      className="w-7 ml-auto mr-10
        mt-10 block"
    >
      <img src={prev} alt="prevbutton" className="w-full object-cover " />
    </button>
  );
}
