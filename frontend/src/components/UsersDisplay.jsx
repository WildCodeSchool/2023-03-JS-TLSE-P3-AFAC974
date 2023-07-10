import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import SortBy from "./SortBy";
import SearchBar from "./SearchBar";
import userSample from "../assets/user_sample.png";

function UsersDisplay() {
  const [data, setData] = useState([]);
  const [deletedUserId, setDeletedUserId] = useState(null);

  const handleUsersSorting = (someData) => {
    return someData.sort((a, b) => {
      if (a.pseudo < b.pseudo) {
        return -1;
      }
      if (a.pseudo > b.pseudo) {
        return 1;
      }
      return 0;
    });
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`).then((res) => {
      const data2 = res.data;
      setData(data2);
    });
  }, [deletedUserId]);

  return (
    <div className="absolute mt-[60px] w-full flex flex-col items-center">
      <div className="flex justify-center sm:justify-between items-center w-[100%]">
        <div className="flex flex-col  md:flex-row justify-between items-center gap-[16px] md:gap-[50px] p-[20px] mx-[50px]">
          <div className="imageCircleContainer w-[110px] h-[110px] border border-0.5 border-gray-500 border-solid  rounded-full overflow-hidden ">
            <img
              src={userSample}
              alt="profile sample"
              className="object-cover w-[full] h-full"
            />
          </div>
          <p>Gestion des utilisateurs</p>
        </div>
        <div>
          <p className="hidden md:block mx-[70px] ">Bouton retour</p>
        </div>
      </div>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:w-[100%] items-center sm:px-[100px] ">
        <SortBy
          handleChange={() => {
            handleUsersSorting(data);
          }}
        />
        <SearchBar searchTerm="hey" handleInputChange="blabla" />
        <p className="text-transparent sm:w-[15%]">|</p>
      </div>
      {data.map((user) => {
        return (
          <div key={user.id} className="w-[100%] sm:px-[100px]">
            <UserCard user={user} setDeletedUserId={setDeletedUserId} />
          </div>
        );
      })}
    </div>
  );
}

export default UsersDisplay;
