import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserCard from "../components/UserCard";
import SortBy from "../components/SortBy";
import SearchBar from "../components/SearchBar";
import backArrow from "../assets/back-arrow.png";

function UsersAdministration() {
  const [data, setData] = useState([]);
  const [deletedUserId, setDeletedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);

  const filterAndSortData = () => {
    let sortedData = [...data];
    if (searchTerm) {
      sortedData = sortedData.filter((item) => {
        if (
          (item.lastname &&
            typeof item.lastname === "string" &&
            item.lastname.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.firstname &&
            typeof item.firstname === "string" &&
            item.firstname.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.pseudo &&
            typeof item.pseudo === "string" &&
            item.pseudo.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          return true;
        }
        return false;
      });
    }

    if (filter === "asc") {
      sortedData.sort((a, b) => {
        if (a.pseudo && b.pseudo) {
          return a.pseudo.localeCompare(b.pseudo);
        }
        return 0;
      });
    } else if (filter === "desc") {
      sortedData.sort((a, b) => {
        if (a.pseudo && b.pseudo) {
          return b.pseudo.localeCompare(a.pseudo);
        }
        return 0;
      });
    }
    return sortedData;
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const filteredAndSorted = filterAndSortData();
    setFilteredAndSortedData(filteredAndSorted);
  }, [data, searchTerm, filter]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((res) => {
        const data2 = res.data;
        setData(data2);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [deletedUserId]);

  const [adminData, setAdminData] = useState(null);
  const [isLoadedAdminData, setIsLoadedAdminData] = useState(false);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/findadmin`)
      .then((response) => {
        setAdminData(response.data[0]);
        setIsLoadedAdminData(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="absolute mt-[60px] w-full flex flex-col items-center">
      {isLoadedAdminData && (
        <div className="flex justify-center xl:justify-between items-center w-[100%]">
          <div className="flex flex-col  md:flex-row justify-between items-center gap-[16px] md:gap-[50px] p-[20px] mx-[50px] xl:my-[30px]">
            <div className="imageCircleContainer w-[110px] h-[110px] border border-0.5 border-gray-300 border-solid  rounded-full overflow-hidden">
              {adminData && adminData.length > 0 && adminData[0].image ? (
                <img
                  src={adminData[0].image}
                  alt="profile pic"
                  className="object-cover h-[100%] w-[100%]"
                />
              ) : (
                <div className="bg-[#7F253E] min-w-[120px] min-h-[120px] w-[20vw] h-[20vw] md:w-[15vw] md:h-[15vw] lg:w-[12vw] lg:h-[12vw] xl:w-[12vw] xl:h-[12vw] object-cover rounded-full flex items-center justify-center">
                  <h1 className="text-white text-[50px] xl:text-[70px]">
                    {adminData[0].firstname.charAt(0)}
                    {adminData[0].lastname.charAt(0)}
                  </h1>
                </div>
              )}
            </div>
            <p className="text-3xl xl:text-4xl text-rose-900 font-semibold whitespace-nowrap mb-[24px] xl:mb-[0px]">
              Gestion des utilisateurs
            </p>
          </div>
          <Link
            to="/admin"
            className="hidden md:flex mx-[70px] gap-1 text-xl items-center"
          >
            <img src={backArrow} alt="fleche retour" />
            <p>Retour</p>
          </Link>
        </div>
      )}
      <div className="flex flex-col-reverse xl:flex-row xl:w-[100%] items-center  xl:px-[100px]">
        <div className="flex flex-1">
          <SortBy handleChange={handleChange} className="flex flex-1" />
        </div>
        <div className="flex flex-1 justify-center">
          <SearchBar
            searchTerm={searchTerm}
            handleInputChange={handleInputChange}
            className="flex flex-2"
          />
        </div>
        <div className="flex flex-1" />
      </div>
      {filteredAndSortedData.map((user) => (
        <div
          key={user.id}
          className="w-[100%] xl:px-[100px] flex flex-col gap-2 xl:gap-7 xl:mt-[28px]"
        >
          <UserCard user={user} setDeletedUserId={setDeletedUserId} />
          <hr className=" w-[100%] border border-solid border-gray-200 xl:border-gray-400" />
        </div>
      ))}
    </div>
  );
}

export default UsersAdministration;
