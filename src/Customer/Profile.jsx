import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Profile = () => {
  const { token,address,setAddress } = useContext(AuthContext);

  const [user, setUser] = useState({});

  const apibase = "https://grocery-kirana-store.onrender.com";

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${apibase}/customer/myprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      setAddress(response.data.address)
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6">

        <div className="flex flex-col gap-5">

          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <h2 className="text-lg font-semibold">{user.name}</h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <h2 className="text-lg">{user.email}</h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Mobile</p>
            <h2 className="text-lg">{user.mobile}</h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Address</p>
            <h2 className="text-lg">{user.address}</h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm">City</p>
            <h2 className="text-lg">{user.city}</h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm">State</p>
            <h2 className="text-lg">{user.state}</h2>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Pincode</p>
            <h2 className="text-lg">{user.pincode}</h2>
          </div>

          

        </div>

      </div>

    </div>
  );
};

export default Profile;