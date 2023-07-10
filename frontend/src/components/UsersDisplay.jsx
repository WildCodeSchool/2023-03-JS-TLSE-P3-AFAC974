import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import userSample from "../assets/user_sample.png";

function UsersDisplay() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users`).then((res) => {
      const { data2 } = res;
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
      <div className="flex justify-between items-center mx-[100px]">
        <p>Trier par</p>
        <p>Rechercher un user</p>
        <p className="text-transparent">|</p>
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
