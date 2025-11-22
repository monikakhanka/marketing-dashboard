import { useMemo, useState, useCallback } from "react";
import FilterPanel from "./FilterPanel";
import "./styles/PaginatedTable.css";

export default function PaginatedTable({
  data,
  selectedRegion,
  setSelectedRegion,
  selectedChannel,
  setSelectedChannel,
  sortConfig,
  setSortConfig,
}) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const regions = useMemo(() => {
    return [...new Set(data.map((d) => d.region))];
  }, [data]);

  const channelsByRegion = useMemo(() => {
    const group = {};
    for (const item of data) {
      if (!group[item.region]) group[item.region] = [];
      if (!group[item.region].includes(item.channel)) {
        group[item.region].push(item.channel);
      }
    }
    return group;
  }, [data]);
  const totalPages = useMemo(
    () => Math.ceil(data.length / pageSize),
    [data.length]
  );

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [page, data]);

  const handleSort = useCallback(
    (column) => {
      setSortConfig((prev) => {
        if (prev.column === column) {
          return { column, order: prev.order === "asc" ? "desc" : "asc" };
        }
        return { column, order: "asc" };
      });

      setPage(1);
    },
    [setSortConfig]
  );

  const getSortIcon = useCallback(
    (column) => {
      if (sortConfig.column !== column) return "⇅";
      return sortConfig.order === "asc" ? "↑" : "↓";
    },
    [sortConfig]
  );

  const goToFirstPage = () => setPage(1);
  const goToLastPage = () => setPage(totalPages);
  const goToPrevPage = () => setPage((p) => Math.max(1, p - 1));
  const goToNextPage = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="dashboard-container">
      <FilterPanel
        regions={regions}
        channelsByRegion={channelsByRegion}
        selectedRegion={selectedRegion}
        setSelectedRegion={(region) => {
          setSelectedChannel(null);
          setSelectedRegion(region);
          setPage(1);
        }}
        selectedChannel={selectedChannel}
        setSelectedChannel={(channel) => {
          setSelectedChannel(channel);
          setPage(1);
        }}
      />

      <div className="table-container">
        <h2>Marketing Data Table</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                ID <span className="sort-icon">{getSortIcon("id")}</span>
              </th>
              <th onClick={() => handleSort("channel")}>
                Channel{" "}
                <span className="sort-icon">{getSortIcon("channel")}</span>
              </th>
              <th onClick={() => handleSort("region")}>
                Region{" "}
                <span className="sort-icon">{getSortIcon("region")}</span>
              </th>
              <th onClick={() => handleSort("spend")}>
                Spend <span className="sort-icon">{getSortIcon("spend")}</span>
              </th>
              <th onClick={() => handleSort("impressions")}>
                Impressions{" "}
                <span className="sort-icon">{getSortIcon("impressions")}</span>
              </th>
              <th onClick={() => handleSort("conversions")}>
                Conversions{" "}
                <span className="sort-icon">{getSortIcon("conversions")}</span>
              </th>
              <th onClick={() => handleSort("clicks")}>
                Clicks{" "}
                <span className="sort-icon">{getSortIcon("clicks")}</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {pageData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.channel}</td>
                <td>{row.region}</td>
                <td>{row.spend}</td>
                <td>{row.impressions}</td>
                <td>{row.conversions}</td>
                <td>{row.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={goToFirstPage} disabled={page === 1}>
            ⏮ First
          </button>
          <button onClick={goToPrevPage} disabled={page === 1}>
            ◀ Prev
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button onClick={goToNextPage} disabled={page === totalPages}>
            Next ▶
          </button>
          <button onClick={goToLastPage} disabled={page === totalPages}>
            Last ⏭
          </button>
        </div>
      </div>
    </div>
  );
}
