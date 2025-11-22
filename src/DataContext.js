import { createContext, useContext, useMemo, useState } from "react";
import rawData from "./data.json";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    column: null,
    order: "asc",
  });

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
  }, [selectedRegion, selectedChannel, sortConfig]);

  const value = {
    filteredData,
    selectedRegion,
    setSelectedRegion,
    selectedChannel,
    setSelectedChannel,
    sortConfig,
    setSortConfig,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
