import React from "react";

const Modal = ({ updateRecord, selectedUserData, editData, handelCancel }) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 bg-gray-800 flex items-center justify-center z-50">
      <div className="w-11/12 max-w-md bg-white rounded-lg p-8">
        <form onSubmit={(e) => updateRecord(e, selectedUserData)}>
          <div className="mb-4">
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              className="w-full px-4 py-2 border rounded"
              value={selectedUserData.name}
              onChange={editData}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded"
              value={selectedUserData.email}
              onChange={editData}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Phone Number</label>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Enter your Phone Number"
              className="w-full px-4 py-2 border rounded"
              value={selectedUserData.phoneNumber}
              onChange={editData}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="w-full px-4 py-2 border rounded"
              value={selectedUserData.dob}
              onChange={editData}
              required
            />
          </div>
          <div className="flex mb-4">
            <div className="mr-2 w-[50%]">
              <label className="block text-gray-600">City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter your City Name"
                className="w-full px-4 py-2 border rounded"
                value={selectedUserData.city}
                onChange={editData}
                required
              />
            </div>
            <div className="w-[50%]">
              <label className="block text-gray-600">District</label>
              <input
                type="text"
                name="district"
                placeholder="Enter District Name"
                className="w-full px-4 py-2 border rounded"
                value={selectedUserData.district}
                onChange={editData}
                required
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="mr-2 w-[50%]">
              <label className="block text-gray-600">Province</label>
              <select
                name="province"
                className="w-full px-4 py-2 border rounded"
                value={selectedUserData.province}
                onChange={editData}
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
            <div className="w-[50%]">
              <label className="block text-gray-600">Country</label>
              <input
                type="text"
                name="country"
                className="w-full px-4 py-2 border rounded"
                value="Nepal"
                onChange={editData}
                readOnly
              />
            </div>
          </div>
          <div className="mb-4 flex justify-between">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Update
            </button>

            <button
              type="Reset"
              onClick={handelCancel}
              className="bg-red-500 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
