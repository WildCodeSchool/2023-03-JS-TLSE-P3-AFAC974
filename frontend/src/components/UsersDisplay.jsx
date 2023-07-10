import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserCard from "./UserCard";
import SortBy from "./SortBy";
import SearchBar from "./SearchBar";
import userSample from "../assets/user_sample.png";

function UsersDisplay() {
  const [data, setData] = useState([]);
  const [deletedUserId, setDeletedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);

  const filterAndSortData = () => {
    let sortedData = [...data];
    if (searchTerm) {
      sortedData = sortedData.filter((item) => {
        if (item.lastname && typeof item.lastname === "string") {
          return item.lastname.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <div className="absolute mt-[60px] w-full flex flex-col items-center">
      <div className="flex justify-center sm:justify-between items-center w-[100%]">
        <div className="flex flex-col  md:flex-row justify-between items-center gap-[16px] md:gap-[50px] p-[20px] mx-[50px]">
          <div className="imageCircleContainer w-[110px] h-[110px] border border-0.5 border-gray-500 border-solid  rounded-full overflow-hidden">
            <img
              src={userSample}
              alt="profile sample"
              className="object-cover w-[full] h-full"
            />
          </div>
          <p>Gestion des utilisateurs</p>
        </div>
        <Link to="/admin" className="hidden md:block mx-[70px]">
          Bouton retour
        </Link>
      </div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:w-[100%] items-center sm:px-[100px]">
        <SortBy handleChange={handleChange} />
        <SearchBar
          searchTerm={searchTerm}
          handleInputChange={handleInputChange}
        />
        <p className="text-transparent sm:w-[15%]">|</p>
      </div>
      {filteredAndSortedData.map((user) => (
        <div key={user.id} className="w-[100%] sm:px-[100px]">
          <UserCard user={user} setDeletedUserId={setDeletedUserId} />
        </div>
      ))}
    </div>
  );
}

export default UsersDisplay;
