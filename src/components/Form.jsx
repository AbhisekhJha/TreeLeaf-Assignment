import React, { useState, useEffect } from "react";

const App = ({ addRecord, inputData, userData, resetForm }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      if (files[0] && files[0].type !== "image/png") {
        alert("Only PNG files are allowed");
        e.target.value = "";
        return;
      }
      inputData({
        target: {
          name,
          value: files[0],
        },
      });
    } else {
      inputData(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-red-400 to-yellow-400 p-6">

      <div className="border-t-4 border-lime-500 p-6 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600">

        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
  User Information Form
        </h1>

          <form onSubmit={addRecord}>
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500"
                  value={userData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter your Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500"
                  value={userData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your City Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500"
                  value={userData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">District</label>
                <input
                  type="text"
                  name="district"
                  placeholder="Enter District Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500"
                  value={userData.district}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Province</label>
                <select
                  name="province"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500"
                  value={userData.province}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Your Province</option>
                  <option value="1">Province 1</option>
                  <option value="2">Province 2</option>
                  <option value="3">Province 3</option>
                  <option value="4">Province 4</option>
                  <option value="5">Province 5</option>
                  <option value="6">Province 6</option>
                  <option value="7">Province 7</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Country</label>
                <select
                  name="country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500"
                  value={userData.country}
                  onChange={handleInputChange}
                  required
                >
                  {countries.map((country) => (
                    <option key={country.cca3} value={country.name.common}>
                      {country.name.common}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Profile Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  accept=".png"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500"
                  value={userData.profile}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-blue-500"
              >
                Add Record
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-red-500"
              >
                Reset Record
              </button>
            </div>
          </form>
        </div>
      </div>
    
  );
};

export default App;
