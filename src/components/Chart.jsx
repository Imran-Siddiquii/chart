import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
  const countryData = data.reduce((acc, data) => {
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

  return (
    <div>
      <h2>Bar Chart of user basis of the Country</h2>
      <ResponsiveContainer>
        <BarChart
          // style={{ width: "800px", height: "400px" }}
          width={800}
          height={400}
          data={countryChartData}
          margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="rgb(65, 105, 225)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
