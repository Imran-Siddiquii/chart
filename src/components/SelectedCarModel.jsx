import React from "react";

const SelectedCarModel = ({ userCarModel, selectedModel }) => {
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
        <h4 key={user.id}>{user.username}</h4>
      ))}
    </div>
  );
};

export default SelectedCarModel;
