import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const profile = ({}) => {
  const [allUserData, setAllUserData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  useEffect(() => {
    try {
      const keys = Object.keys(localStorage);
      const userDataArray = keys.map((key) => {
        return { ...JSON.parse(localStorage.getItem(key)), key };
      });
      setAllUserData(userDataArray);
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  // useEffect(() => {
  //   const storedData = Object.keys(localStorage)
  //     .filter((key) => key.startsWith("userData_"))
  //     .map((key) => JSON.parse(localStorage.getItem(key)));

  //   setAllUserData(storedData);
  // }, []);

  const editRecord = (key) => {
    const recordToEdit = allUserData.find((data) => data.key === key);

    if (recordToEdit) {
      setSelectedUserData(recordToEdit);
      setIsPopUpOpen(true);
    } else {
      console.error(`Record with key ${key} not found.`);
    }
  };

  const editData = (e) => {
    const { name, value } = e.target;
    setSelectedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateRecord = (e, updatedUserData) => {
    e.preventDefault();
    if (
      updatedUserData.phoneNumber.length < 7 ||
      !/^\d+$/.test(updatedUserData.phoneNumber)
    ) {
      toast.error(
        "Phone number must be at least 7 digits and contain only numbers!"
      );
      return;
    }

    const key = `userData_${updatedUserData.timestamp}`;

    try {
      localStorage.setItem(key, JSON.stringify(updatedUserData));
      toast.success("Data update  Sucessfully");
      setIsPopUpOpen(false);
      setAllUserData((prevData) =>
        prevData.map((data) =>
          data.timestamp === updatedUserData.timestamp ? updatedUserData : data
        )
      );
    } catch (error) {
      console.error("Error updating data to localStorage:", error);
    }
  };
  const handelCancel = () => {
    setIsPopUpOpen(false);
  };

  const handleDeleteData = (key) => {
    try {
      localStorage.removeItem(key);
      const updatedUserData = allUserData.filter((data) => data.key !== key);
      setAllUserData(updatedUserData);
      toast.success("Deleted Data Sucessfully");
    } catch (error) {
      console.error("Error deleting data from localStorage:", error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortUserData = () => {
    return [...allUserData].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  };

  return (
    <div>
      <Table
        allUserData={allUserData}
        handleDeleteData={handleDeleteData}
        editRecord={editRecord}
        toggleSortOrder={toggleSortOrder}
        sortOrder={sortOrder}
      />

      {isPopUpOpen && (
        <Modal
          handelCancel={handelCancel}
          selectedUserData={selectedUserData}
          editData={editData}
          updateRecord={updateRecord}
        />
      )}

      <Link to="/">
        <button
          type="button"
          className="bg-red-500 text-white  rounded mb-10 w-[50%] ml-[25%]"
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default profile;
