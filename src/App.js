import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import "./App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Userlist from "./Userlist";

const generateFakeData = () => {
  const fakeData = [];
  for (let i = 0; i < 100; i++) {
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
const App = () => {
  const [genrateData, setGenerateData] = useState([]);
  const [ageRange, setAgeRange] = useState(null);
  useEffect(() => {
    const fakeData = generateFakeData();
    setGenerateData(fakeData);
    console.log(fakeData, "!!!!");
  }, []);
  console.log(genrateData, "###");
  const countryData = genrateData.reduce((acc, data) => {
    if (!acc[data.country]) {
      acc[data.country] = 0;
    }
    acc[data.country]++;
    return acc;
  }, {});

  const countryChartData = Object.keys(countryData).map((key) => ({
    country: key,
    users: countryData[key],
  }));

  // create api chart

  const carData = genrateData.reduce((acc, data) => {
    if (!acc[data.vehicle_information.manufacturer]) {
      acc[data.vehicle_information.manufacturer] = {};
    }
    if (
      !acc[data.vehicle_information.manufacturer][
        data.vehicle_information.model
      ]
    ) {
      acc[data.vehicle_information.manufacturer][
        data.vehicle_information.model
      ] = 0;
    }
    acc[data.vehicle_information.manufacturer][
      data.vehicle_information.model
    ]++;
    return acc;
  }, {});

  const carChartData = Object.keys(carData).map((maker) => ({
    name: maker,
    value: Object.values(carData[maker]).reduce((sum, count) => sum + count),
    data: Object.entries(carData[maker]).map(([model, count]) => ({
      name: model,
      value: count,
    })),
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#FFA07A",
  ];
  const COLORS1 = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#FFA07A",
  ];

  // pie chart for there car age

  const carAgeData = genrateData.reduce((acc, data) => {
    const ageGroup = Math.floor(data.vehicle_information.age / 5) * 5;
    if (!acc[ageGroup]) {
      acc[ageGroup] = 0;
    }
    acc[ageGroup]++;
    return acc;
  }, {});

  const carAgeChartData = Object.entries(carAgeData).map(([age, count]) => ({
    name: `${age}-${Number(age) + 4}`,
    value: count,
  }));

  // for filtering data
  // car modal data

  const carModelData = genrateData.reduce((acc, data) => {
    const model = data.vehicle_information.model;
    if (!acc[model]) {
      acc[model] = 0;
    }
    acc[model]++;
    return acc;
  }, {});

  const carModelChartData = Object.entries(carModelData).map(
    ([model, count]) => ({
      name: model,
      value: count,
    })
  );

  const carAgeData1 = genrateData.reduce((acc, data) => {
    if (ageRange) {
      const ageGroup = Math.floor(data.vehicle_information.age / 5) * 5;
      if (ageGroup < ageRange[0] || ageGroup > ageRange[1]) {
        return acc;
      }
    }
    const ageGroup = Math.floor(data.vehicle_information.age / 5) * 5;
    if (!acc[ageGroup]) {
      acc[ageGroup] = 0;
    }
    acc[ageGroup]++;
    return acc;
  }, {});

  const carAgeChartData1 = Object.entries(carAgeData1).map(([age, count]) => ({
    name: `${age}-${Number(age) + 4}`,
    value: count,
  }));

  const COLORS2 = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#FFA07A",
  ];

  return (
    <>
      <div className="container">
        <div className="full-height">
          <Userlist data={genrateData} />
        </div>
        <div className="normal">
          <div
            style={{
              width: "50%",
              left: "50%",
              position: "absolute",
              // left: 350,
              top: 30,
              alignItems: "center",
              justifyContent: "center",
              // font-size: calc(10px + 2vmin);
              // color: white;
            }}
          >
            <div>
              <h2>Bar Chart of user basis of the Country</h2>
              <BarChart
                width={600}
                height={300}
                data={countryChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" />
              </BarChart>
            </div>
            <div>
              {carChartData.map((makerData, i) => (
                <div key={i}>
                  <h2>{makerData.name}</h2>
                  <PieChart width={400} height={400}>
                    <Legend />
                    <Tooltip />
                    <Pie
                      dataKey="value"
                      data={makerData.data}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label={({ name, value }) => `${name} (${value})`}
                    >
                      {makerData.data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              ))}
            </div>

            <div>
              <h2>Car Age Distribution</h2>
              <PieChart width={400} height={400}>
                <Legend />
                <Tooltip />
                <Pie
                  dataKey="value"
                  data={carAgeChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {carAgeChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS1[index % COLORS1.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>

            {/*  filter the value */}

            <div>
              <h2>Car Model Distribution</h2>
              <select
                onChange={(event) =>
                  setAgeRange(
                    event.target.value
                      ? event.target.value.split("-").map(Number)
                      : null
                  )
                }
              >
                <option value="">All Ages</option>
                {[...Array(13)].map((_, index) => (
                  <option key={index} value={`${index * 5}-${index * 5 + 4}`}>
                    {`${index * 5} - ${index * 5 + 4}`}
                  </option>
                ))}
              </select>
              <PieChart width={400} height={400}>
                <Legend />
                <Tooltip />
                <Pie
                  dataKey="value"
                  data={carModelChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {carModelChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>

              <h2>Car Age Distribution</h2>
              <select
                onChange={(event) =>
                  setAgeRange(
                    event.target.value
                      ? event.target.value.split("-").map(Number)
                      : null
                  )
                }
              >
                <option value="">All Ages</option>
                {[...Array(13)].map((_, index) => (
                  <option key={index} value={`${index * 5}-${index * 5 + 4}`}>
                    {`${index * 5} - ${index * 5 + 4}`}
                  </option>
                ))}
              </select>
              <PieChart width={400} height={400}>
                <Legend />
                <Tooltip />
                <Pie
                  dataKey="value"
                  data={carAgeChartData1}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {carAgeChartData1.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS2[index % COLORS2.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
      </div>

      {/* list */}
    </>
  );
};

export default App;

//         <li
//           classNameName={`menu-item ${activeItem === 2 ? "active" : ""}`}
//           onClick={() => toggleDropdown(2)}
//         >
// const [activeItem, setActiveItem] = useState(null);

// function toggleDropdown(index) {
//   if (activeItem === index) {
//     setActiveItem(null);
//   } else {
//     setActiveItem(index);
//   }
// }
