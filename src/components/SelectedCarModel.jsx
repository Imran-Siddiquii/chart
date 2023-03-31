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
      <h2 className="sticky-header">Car Model Users</h2>
      <div>
        {userCarModel.map((user) => (
          <h4
            key={user.id}
            className=""
            style={{ padding: "5px 10px", letterSpacing: "1px" }}
          >
            {user.username}
          </h4>
        ))}
      </div>
    </div>
  );
};

export default SelectedCarModel;
