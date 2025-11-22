import { useState, useMemo } from "react";
import "./App.css";
import PaginatedTable from "./PaginatedTable";
import Totals from "./Totals";
import data from "./data.json";

function App() {
  const [rawData] = useState(data);

  // Lift filter + sorting state UP so Totals can access filtered data
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    column: null,
    order: "asc",
  });

  /** ---------------- FILTER + SORT IN APP ---------------- */
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
      {/* ---------- TOTALS (computed from filtered+sorted data) ---------- */}
      <Totals data={filteredData} />

      {/* ---------- TABLE ---------- */}
      <PaginatedTable
        data={filteredData} // sorted + filtered data
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    </div>
  );
}

export default App;
