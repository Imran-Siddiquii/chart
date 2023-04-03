import React, { useState } from "react";
import {
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const CarDistrubution = ({ data }) => {
  const [ageRange, setAgeRange] = useState(null);
  const [modelRange, setModelRange] = useState(null);
  // get car modeldata
  const carModelData = data.reduce((acc, data) => {
    if (modelRange) {
      const ageGroup = Math.floor(data.age / 5) * 5;
      if (ageGroup < modelRange[0] || ageGroup > modelRange[1]) {
        return acc;
      }
    }
    const ageGroup = Math.floor(data.age / 5) * 5;
    if (!acc[ageGroup]) {
      acc[ageGroup] = 0;
    }
    acc[ageGroup]++;
    return acc;
  }, {});
  const carModelChartData = Object.entries(carModelData).map(
    ([model, count]) => ({
      name: `${model}-${Number(model) + 4}`,
      value: count,
    })
  );

  // car age data

  const carAgeData = data.reduce((acc, data) => {
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
  const carAgeChartData = Object.entries(carAgeData).map(([age, count]) => ({
    name: `${age}-${Number(age) + 4}`,
    value: count,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#FFA07A",
  ];
  return (
    <div className="chart-container">
      <div>
        <h2
          style={{
            background: "rgb(65, 105, 225)",
            color: "white",
            padding: "5px 15px",
          }}
        >
          Car Model Distribution
        </h2>
        <span style={{ color: "rgb(65, 105, 225)" }}>
          {" "}
          Filter by Age users age :{" "}
        </span>
        <select
          onChange={(event) =>
            setModelRange(
              event.target.value
                ? event.target.value.split("-").map(Number)
                : null
            )
          }
        >
          <option value="">All Ages</option>
          {[...Array(20)].map((_, index) => (
            <option key={index} value={`${index * 5}-${index * 5 + 4}`}>
              {`${index * 5} - ${index * 5 + 4}`}
            </option>
          ))}
        </select>
        <PieChart width={800} height={700}>
          <Legend />
          <Tooltip />
          <Pie
            dataKey="value"
            data={carModelChartData}
            cx="50%"
            cy="50%"
            outerRadius={200}
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
      </div>
      {/* for car age filter */}
      <ResponsiveContainer width={700} height="80%">
        <div>
          <h2
            style={{
              background: "rgb(65, 105, 225)",
              color: "white",
              padding: "5px 15px",
            }}
          >
            Car Age Distribution
          </h2>
          <span style={{ color: "rgb(65, 105, 225)" }}>
            {" "}
            Filter by car age :{" "}
          </span>{" "}
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
            {[...Array(9)].map((_, index) => (
              <option key={index} value={`${index * 5}-${index * 5 + 4}`}>
                {`${index * 5} - ${index * 5 + 4}`}
              </option>
            ))}
          </select>
          <PieChart width={800} height={700}>
            <Legend />
            <Tooltip />
            <PolarAngleAxis height={200} />
            <Pie
              dataKey="value"
              data={carAgeChartData}
              cx="50%"
              cy="50%"
              outerRadius={200}
              fill="#8884d8"
              label={({ name, value }) => `${name} (${value})`}
            >
              {carAgeChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default CarDistrubution;
