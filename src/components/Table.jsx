import React, { useState } from "react";

const Table = ({
  allUserData,
  handleDeleteData,
  editRecord,
  toggleSortOrder,
  sortOrder,
}) => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterParams, setFilterParams] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    city: "",
    district: "",
    province: "",
    country: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter data based on search term and filter parameters
  const filteredData = allUserData.filter(user => {
    return (
      (!searchTerm || user.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterParams.name || user.name.toLowerCase().includes(filterParams.name.toLowerCase())) &&
      (!filterParams.email || user.email.toLowerCase().includes(filterParams.email.toLowerCase())) &&
      (!filterParams.phoneNumber || user.phoneNumber.toLowerCase().includes(filterParams.phoneNumber.toLowerCase())) &&
      (!filterParams.dob || user.dob.toLowerCase().includes(filterParams.dob.toLowerCase())) &&
      (!filterParams.city || user.city.toLowerCase().includes(filterParams.city.toLowerCase())) &&
      (!filterParams.district || user.district.toLowerCase().includes(filterParams.district.toLowerCase())) &&
      (!filterParams.province || user.province.toLowerCase().includes(filterParams.province.toLowerCase())) &&
      (!filterParams.country || user.country.toLowerCase().includes(filterParams.country.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const sortUserData = () => {
    return [...filteredData].sort((a, b) => {
      const nameA = a.name ? a.name.toUpperCase() : "";
      const nameB = b.name ? b.name.toUpperCase() : "";

      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  };

  const getCurrentPageData = () => {
    const sortedData = sortUserData();
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilter = () => {
    setCurrentPage(1); // Reset to first page on filter
  };

  const currentData = getCurrentPageData();

  return (
    <div className="w-full mt-10">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="font-bold text-3xl text-center">User Information Table</h1>

        {/* Search Input and Button */}
        <div className="flex items-center mb-4 space-x-2">
          <input
            type="text"
            placeholder="Search By Name..."
            className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => {}}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Filters
          </button>
        </div>

        {/* Filter Section */}
        {showFilters && (
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            {Object.keys(filterParams).map((key) => (
              <div key={key} className="flex items-center mb-2 space-x-2">
                <label htmlFor={key} className="text-sm font-medium text-gray-700 capitalize">
                  {key}:
                </label>
                <input
                  type="text"
                  id={key}
                  placeholder={`Filter by ${key}...`}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterParams[key]}
                  onChange={(e) => setFilterParams(prev => ({ ...prev, [key]: e.target.value }))}
                />
              </div>
            ))}
            <button
              onClick={handleFilter}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Apply Filters
            </button>
          </div>
        )}

        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th
                className="py-2 px-4 border cursor-pointer"
                onClick={toggleSortOrder}
              >
                Name {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone Number</th>
              <th className="py-2 px-4 border">Date of Birth</th>
              <th className="py-2 px-4">
                Address
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border">City</th>
                      <th className="py-2 px-4 border">District</th>
                      <th className="py-2 px-4 border">Province</th>
                      <th className="py-2 px-4 border">Country</th>
                    </tr>
                  </thead>
                </table>
              </th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((user) => (
              <tr key={user.key}>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.phoneNumber}</td>
                <td className="py-2 px-4 border">{user.dob}</td>
                <td className="py-2 px-4 border">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border">{user.city}</td>
                        <td className="py-2 px-4 border">{user.district}</td>
                        <td className="py-2 px-4 border">{user.province}</td>
                        <td className="py-2 px-4 border">{user.country}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td className="py-2 px-4 border">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => editRecord(user.key)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    onClick={() => handleDeleteData(user.key)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            } px-3 py-1 rounded mr-2`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`${
              currentPage === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            } px-3 py-1 rounded`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
