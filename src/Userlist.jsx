import React, { useState } from "react";
import { List, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import SelectedCarModel from "./components/SelectedCarModel";
import SelectedUserDetails from "./components/SelectedUserDetails";
import "./Userlist.css";
import { GiHamburgerMenu } from "react-icons/gi";
const Userlist = ({ data }) => {
  const [buttonActive, setButtonActive] = useState("users");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  //for toggle the data
  const [toggle, setToggle] = useState("users");

  const [userCarModel, setUserCarModel] = useState([]);
  // to show which user and model are active
  const [userActive, setUserActive] = useState(null);
  const [toggleNavbar, setToggleNavbar] = useState(true);
  const handleClick = (user) => {
    setSelectedUser(user);
    setUserActive(user);
  };

  // handle Car model
  const handleCarClick = (model) => {
    setUserActive(model);
    setSelectedModel(model);
    setSelectedUser(null);
    const findUser = data.filter(
      (elements) => elements.vehicle_information.model === model
    );
    setUserCarModel(findUser);
  };

  // to get unique car model from array
  const userCarsModel = data.map((ele) => ele.vehicle_information.model);
  const uniqueCarModel = [...new Set(userCarsModel)];

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
  const rowCarRenderer = ({ key, index, style }) => {
    const modelName = uniqueCarModel[index];
    console.log(modelName);
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
    );
  };
  return (
    <div className="list-container">
      <div className="list">
        <h2 className="user-info">
          Users Information{" "}
          <span className="hambugger">
            <GiHamburgerMenu
              className="hambugger"
              onClick={() => setToggleNavbar(!toggleNavbar)}
            />
          </span>
        </h2>
        <div className={`${toggleNavbar ? "openNavbar" : "hideNavbar"}`}>
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
              <div className="user-list">
                <AutoSizer>
                  {({ height, width }) => (
                    <>
                      <List
                        className="user-list-data"
                        height={height}
                        width={width}
                        rowHeight={30}
                        rowCount={data.length}
                        rowRenderer={rowRenderer}
                      />
                    </>
                  )}
                </AutoSizer>
              </div>
            </>
          ) : (
            <>
              <div className="details-header">
                <span className="model-header">Cars Model Name</span>
              </div>
              <div className="user-list">
                <AutoSizer>
                  {({ height, width }) => (
                    <>
                      <List
                        className="user-list1"
                        height={height}
                        width={width}
                        rowHeight={30}
                        rowCount={uniqueCarModel.length}
                        rowRenderer={rowCarRenderer}
                      />
                    </>
                  )}
                </AutoSizer>
              </div>
            </>
          )}
        </div>
        <div>
          {toggle === "users" ? (
            <SelectedUserDetails className="" selectedUser={selectedUser} />
          ) : (
            <SelectedCarModel
              userCarModel={userCarModel}
              selectedModel={selectedModel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Userlist;
