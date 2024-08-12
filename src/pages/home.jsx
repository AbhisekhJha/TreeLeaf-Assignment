import React, { useEffect, useState } from "react";
import Form from "../components/Form";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
  });

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


  const inputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const addRecord = (e) => {
    e.preventDefault();
    if (
      userData.phoneNumber.length < 7 ||
      !/^\d+$/.test(userData.phoneNumber)
    ) {
      toast.error(
        "Phone number must be at least 7 digits and contain only numbers!"
      );
      return;
    }

    const timeStamp = new Date().getTime();
    const key = `userData_${timeStamp}`;

    try {
      localStorage.setItem(
        key,
        JSON.stringify({ ...userData, timestamp: timeStamp })
      );

      setUserData({
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        city: "",
        district: "",
        province: "",
        country: "Nepal",
      });
    } finally {
      toast.success("Data Added Sucessfully");
    }
  };

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

  const resetForm = () => {
    try {
      setUserData({
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        city: "",
        district: "",
        province: "",
        country: "Nepal",
      });
      setUserData([]);
    } catch (error) {
      console.error("Error clearing data from localStorage:", error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <>
      <Form
        addRecord={addRecord}
        inputData={inputData}
        userData={userData}
        resetForm={resetForm}
      />
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
      <Link to="/profile">
        <button
          type="button"
          className="bg-sky-500 text-white  rounded mb-10 w-[50%] ml-[25%]"
        >
          Profiles
        </button>
      </Link>
    </>
  );
};

export default Home;
