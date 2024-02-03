import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      const {
        email,
        name: { last, first, title },
      } = response.data.results[0];

      setUserData({ name: `${title} ${first} ${last}`, email });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const refreshUserData = () => {
    fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div
      // style={{ display: "flex", justifyContent: "center" }}
      className='flex items-center justify-center w-auto  '
    >
      <div className='mt-48 border border-slate-950 bg-white '>
        <div className='m-10 mt-28  h-[200px]  text-center bg-white'>
          <p className='text-lg font-semibold bg-white'>
            Name: {userData?.name}
          </p>
          <p className='text-lg bg-white'>Email: {userData?.email}</p>
          <button
            className=' mx-[230px]  mt-8 ml-[185px] bg-amber-400 w-24  rounded-md '
            onClick={refreshUserData}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
