import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import axios from "axios";

const Profile = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setProfileData(response.data.data);
      } else {
        setError("Failed to fetch profile");
      }
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
      setError("Error fetching profile");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  // Handle form changes
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle file upload change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    setSuccessMessage("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("phone", profileData.phone);
      formData.append("address", profileData.address);

      if (selectedFile) {
        formData.append("profilePicture", selectedFile);
      }

      const response = await axios.put(`${backendUrl}/api/user/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setSuccessMessage("Profile updated successfully!");
        setProfileData(response.data.data);
        setSelectedFile(null);
      } else {
        setError(response.data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      setError("Error updating profile");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"PROFILE"} />
      </div>
      <div className="max-w-md mx-auto mt-6 p-6 border rounded-md shadow-md bg-white">
        {profileData ? (
          <>

            <div className="mt-4">
              <label className="block text-lg font-semibold">👤 Name:</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mt-4">
              <label className="block text-lg font-semibold">📧 Email:</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                disabled
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <div className="mt-4">
              <label className="block text-lg font-semibold">📞 Phone:</label>
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mt-4">
              <label className="block text-lg font-semibold">🏠 Address:</label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
            {error && <p className="text-red-600 mt-4">{error}</p>}

            <button
              onClick={handleUpdateProfile}
              className="border mt-6 w-full bg-white text-black py-2 rounded hover:bg-black hover:text-white transition"
            >
              Save Changes
            </button>
          </>
        ) : (
          <p>No profile data available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
