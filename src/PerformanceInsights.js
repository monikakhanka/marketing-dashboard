import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function PerformanceInsights({ data }) {

  const aggregatedData = data.reduce((acc, cur) => {
    const existing = acc.find((item) => item.region === cur.region);
    if (existing) {
      existing.spend += cur.spend;
    } else {
      acc.push({ region: cur.region, spend: cur.spend });
    }
    return acc;
  }, []);

  return (
    <div className="chart-container">
      <h2>Performance Insights (Spend by Region)</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={aggregatedData} barCategoryGap="10%">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="spend" fill="#8884d8" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
