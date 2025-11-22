import { useState, useMemo, lazy, Suspense } from "react";
import "./App.css";
import PaginatedTable from "./PaginatedTable";
import Totals from "./Totals";
import data from "./data.json";

const PerformanceInsights = lazy(() => import("./PerformanceInsights"));

function App() {
  const [rawData] = useState(data);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    column: null,
    order: "asc",
  });

  const [showChart, setShowChart] = useState(false);

  const filteredData = useMemo(() => {
    let output = [...rawData];

    if (selectedRegion) {
      output = output.filter((d) => d.region === selectedRegion);
    }

    if (selectedChannel) {
      output = output.filter((d) => d.channel === selectedChannel);
    }

    if (sortConfig.column) {
      output.sort((a, b) => {
        let A = a[sortConfig.column];
        let B = b[sortConfig.column];

        if (!isNaN(A)) A = Number(A);
        if (!isNaN(B)) B = Number(B);

        if (A < B) return sortConfig.order === "asc" ? -1 : 1;
        if (A > B) return sortConfig.order === "asc" ? 1 : -1;
        return 0;
      });
    }

    return output;
  }, [rawData, selectedRegion, selectedChannel, sortConfig]);

  return (
    <div className="app-container">
      <Totals data={filteredData} />

      <PaginatedTable
        data={filteredData}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />

      <div className="insights-btn-container">
        <button
          className="insights-btn"
          onClick={() => setShowChart((prev) => !prev)}>
          {showChart ? "Hide Insights" : "Show Performance Insights"}
        </button>
      </div>

      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <PerformanceInsights data={filteredData} />
        </Suspense>
      )}
    </div>
  );
}

export default App;
