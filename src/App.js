import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import "./App.css";
import Userlist from "./Userlist";
import Chart from "./components/Chart";
import CarCharts from "./components/CarCharts";
import CarDistrubution from "./components/CarDistrubution";

const App = () => {
  const [generatedData, setGenerateData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const generateFakeData = () => {
      const fakeData = [];
      for (let i = 0; i < 100000; i++) {
        fakeData.push({
          id: faker.datatype.uuid(),
          username: faker.internet.userName(),
          age: faker.datatype.number({ min: 18, max: 80 }),
          address: faker.address.streetAddress(),
          country: faker.address.country(),
          occupation: faker.name.jobTitle(),
          vehicle_information: {
            model: faker.vehicle.model(),
            age: faker.datatype.number({ min: 1, max: 30 }),
            manufacturer: faker.vehicle.manufacturer(),
          },
        });
      }
      return fakeData;
    };
    const fakeData = generateFakeData();
    setLoading(false);
    setGenerateData(fakeData);
  }, []);

  if (loading) {
    return (
      <div className="App-header">
        <div className="loader"></div>
        <span>Loading....</span>
      </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="full-height">
            <Userlist data={generatedData} />
          </div>
          <div className="normal">
            <Chart data={generatedData} />
            <h2
              className=""
              style={{
                background: "rgb(65, 105, 225)",
                color: "white",
                padding: "5px 15px",
              }}
            >
              Car Pie Charts By Manufacturer
            </h2>
            <CarCharts data={generatedData} />
            <CarDistrubution data={generatedData} />
          </div>
        </div>
      </>
    );
  }
};

export default App;
