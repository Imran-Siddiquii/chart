import React from "react";
import { Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const CarCharts = ({ data }) => {
  const carData = data.reduce((acc, data) => {
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
  return (
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
  );
};

export default CarCharts;
