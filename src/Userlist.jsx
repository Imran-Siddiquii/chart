import React, { useState } from "react";
import { List, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import "./Userlist.css";
const Userlist = ({ data }) => {
  const [buttonActive, setButtonActive] = useState("users");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  //for toggle the data
  const [toggle, setToggle] = useState("users");

  const [userCarModel, setUserCarModel] = useState([]);
  // to show which user and model are active
  const [userActive, setUserActive] = useState(null);
  const handleClick = (user) => {
    setSelectedUser(user);
    setUserActive(user);
  };
  const handleCarClick = (model) => {
    setUserActive(model);

    setSelectedModel(model);
    setSelectedUser(null);
    const findUser = data.filter(
      (elements) => elements.vehicle_information.model === model
    );
    setUserCarModel(findUser);
  };
  const userCarsModel = data.map((ele) => ele.vehicle_information.model);
  const uniqueCarModel = [...new Set(userCarsModel)];

  console.log("unique", [...new Set(userCarsModel)]);

  const rowRenderer = ({ key, index, style }) => {
    setSelectedModel(null);
    const user = data[index];

    return (
      <div className="user-details" key={key} style={style}>
        <div
          className={`${
            userActive === user ? "active" : "not-active"
          } details-header1`}
          onClick={() => handleClick(user)}
        >
          <span className="user-name">{user.username}</span>
          <span className="user-age"> ({user.age})</span>
        </div>
      </div>
    );
  };
  const rowRendererCar = ({ key, index, style }) => {
    const modelName = uniqueCarModel[index];

    return (
      <div key={key} style={style}>
        <div
          onClick={() => handleCarClick(modelName)}
          className={`${
            userActive === modelName ? "active" : "not-active"
          } details-header1`}
          style={{ padding: "10px 20px" }}
        >
          {modelName}
        </div>
      </div>

      //   </div>
    );
  };

  const renderCarModelUser = () => {
    if (!selectedModel) {
      return (
        <div className={`${selectedModel ? "user-list-display" : "no-data"}`}>
          This Car Model does have more
        </div>
      );
    }
    return (
      <div className={`${selectedModel ? "user-list-display" : "no-data"}`}>
        <h2>Car Model Users</h2>
        {userCarModel.map((user) => (
          <h4 key={user.id} className={``}>
            {user.username}
          </h4>
        ))}
      </div>
    );
  };
  const renderUserDetails = () => {
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
          <li>
            Manufacturer: {selectedUser?.vehicle_information?.manufacturer}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="list-container">
      <div className="list">
        <h2 className="user-info">Users Information</h2>
        <div className="user-button">
          <button
            className={`${buttonActive === toggle ? "active-button" : ""} `}
            onClick={() => {
              setSelectedUser(null);
              setToggle("users");
              setButtonActive("users");
            }}
          >
            Users Details
          </button>
          <button
            className={`${buttonActive !== toggle ? "active-button" : ""} `}
            onClick={() => {
              setToggle("Car-models");
              setSelectedUser(null);
            }}
          >
            Cars Model
          </button>
        </div>
        {toggle === "users" ? (
          <>
            <div className="details-header">
              <span className="user-name">User Name</span>{" "}
              <span className="user-age">User Age</span>
            </div>
            <AutoSizer>
              {({ height, width }) => (
                <>
                  <List
                    className="user-list"
                    height={500}
                    width={315}
                    rowHeight={30}
                    rowCount={data.length}
                    rowRenderer={rowRenderer}
                  />
                </>
              )}
            </AutoSizer>
          </>
        ) : (
          <>
            <div className="details-header">
              <span className="model-header">Cars Model Name</span>
            </div>
            <AutoSizer>
              {({ height, width }) => (
                <>
                  <List
                    className="user-list1"
                    height={525}
                    width={315}
                    rowHeight={30}
                    rowCount={uniqueCarModel.length}
                    rowRenderer={rowRendererCar}
                  />
                </>
              )}
            </AutoSizer>
          </>
        )}
      </div>
      <div>
        {toggle === "users" ? renderUserDetails() : renderCarModelUser()}
      </div>
      <div>{}</div>
    </div>
  );
};

export default Userlist;
