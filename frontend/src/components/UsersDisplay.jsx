import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import SortBy from "./SortBy";
import SearchBar from "./SearchBar";
import userSample from "../assets/user_sample.png";

function UsersDisplay() {
  const [data, setData] = useState([]);

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
  }, []);

  return (
    <div className="absolute mt-[60px] w-full">
      <div className="flex justify-between items-center mx-[50px]">
        <div className="flex flex-row justify-between items-center gap-[50px] p-[20px]">
          <div className="imageCircleContainer w-[110px] h-[110px]  rounded-full overflow-hidden ">
            <img
              src={userSample}
              alt="profile sample"
              className="object-cover w-[full] h-full"
            />
          </div>
          <p>Utilisateurs</p>
        </div>
        <div>
          <p>Bouton retour</p>
        </div>
      </div>
      <div className="flex justify-between items-center sm:mx-[100px] z-20">
        <SortBy handleChange={handleUsersSorting} />
        <SearchBar searchTerm="hey" handleInputChange="blabla" />
        <p className="text-transparent sm:w-[15%]">|</p>
      </div>
      {data.map((user) => {
        return (
          <div key={user.id}>
            <UserCard user={user} />
          </div>
        );
      })}
    </div>
  );
}

export default UsersDisplay;
