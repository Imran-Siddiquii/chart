import React from "react";

const Userdetails = ({ selectedUser }) => {
  if (!selectedUser) {
    return (
      <div className={`${selectedUser ? "user-list-display" : "no-data"}`}>
        Please select a user from the list
      </div>
    );
  }
  return (
    <div className={`${selectedUser ? "user-list-display" : "no-data"}`}>
      <h2>User Details</h2>
      <h2>{selectedUser.username}</h2>
      <p>Age: {selectedUser.age}</p>
      <p>Address: {selectedUser.address}</p>
      <p>Country: {selectedUser.country}</p>
      <p>Occupation: {selectedUser.occupation}</p>
      <p>Vehicle Information:</p>
      <ul>
        <li>Model: {selectedUser?.vehicle_information?.model}</li>
        <li>Age: {selectedUser?.vehicle_information?.age}</li>
        <li>Manufacturer: {selectedUser?.vehicle_information?.manufacturer}</li>
      </ul>
    </div>
  );
};

export default Userdetails;
