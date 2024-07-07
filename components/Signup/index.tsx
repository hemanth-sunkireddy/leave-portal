"use client";
import React, { useState } from 'react';

const SelectUserType = () => {
  const [selectedUserType, setSelectedUserType] = useState('');

  // Function to handle dropdown change
  const handleUserTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserType(event.target.value);
  };

  return (
    <div className="mb-8">
      <label htmlFor="userType" className="block text-sm text-dark dark:text-white mb-3">
        Select User Type
      </label>
      <select
        id="userType"
        name="userType"
        value={selectedUserType}
        onChange={handleUserTypeChange}
        className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
      >
        <option value="">Select...</option>
        <option value="student">Student</option>
        <option value="mentor">Mentor</option>
        <option value="warden">Warden</option>
        <option value="principal">Principal</option>
      </select>
      {selectedUserType && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          You selected: {selectedUserType}
        </p>
      )}
    </div>
  );
};

export default SelectUserType;