// PerformanceInsights.js
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useDataContext } from "./DataContext";

export default function PerformanceInsights() {
  const { filteredData } = useDataContext();

  return (
    <div className="chart-container">
      <h2>Performance Insights</h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="spend" stroke="#8884d8" />
          <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
