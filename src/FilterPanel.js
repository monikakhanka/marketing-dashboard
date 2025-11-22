import "./styles/PaginatedTable.css";

export default function FilterPanel({
  regions,
  channelsByRegion,
  selectedRegion,
  setSelectedRegion,
  selectedChannel,
  setSelectedChannel,
}) {
  return (
    <div className="filter-panel">
      <h3 className="filter-heading">Category</h3>

      {/* Regions */}
      <div className="filter-section">
        <h4 className="filter-title">Regions</h4>
        <ul className="filter-list">
          <li
            className={!selectedRegion ? "active" : ""}
            onClick={() => {
              setSelectedRegion(null);
              setSelectedChannel(null);
            }}>
            All Regions
          </li>

          {regions.map((reg) => (
            <li
              key={reg}
              className={selectedRegion === reg ? "active" : ""}
              onClick={() => {
                setSelectedRegion(reg);
                setSelectedChannel(null);
              }}>
              {reg}
            </li>
          ))}
        </ul>
      </div>

      {/* Channels */}
      {selectedRegion && (
        <div className="filter-section">
          <h4 className="filter-title">Channels</h4>
          <ul className="filter-list">
            <li
              className={!selectedChannel ? "active" : ""}
              onClick={() => setSelectedChannel(null)}>
              All Channels
            </li>

            {channelsByRegion[selectedRegion].map((ch) => (
              <li
                key={ch}
                className={selectedChannel === ch ? "active" : ""}
                onClick={() => setSelectedChannel(ch)}>
                {ch}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
