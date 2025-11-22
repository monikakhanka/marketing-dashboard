import React, { useMemo } from "react";
import "./styles/Totals.css";

export default function Totals({ data }) {
  const totals = useMemo(() => {
    const spend = data.reduce((sum, d) => sum + d.spend, 0);
    const conversions = data.reduce((sum, d) => sum + d.conversions, 0);
    const clicks = data.reduce((sum, d) => sum + d.clicks, 0);
    const impressions = data.reduce((sum, d) => sum + d.impressions, 0);
    const ctr = impressions ? ((clicks / impressions) * 100).toFixed(2) : 0;

    return { spend, conversions, clicks, impressions, ctr };
  }, [data]);

  return (
    <div className="totals-container">
      <h3>Totals</h3>
      <div className="totals-grid">
        <div>
          <strong>Total Spend:</strong> ${totals.spend.toFixed(2)}
        </div>
        <div>
          <strong>Total Conversions:</strong> {totals.conversions}
        </div>
        <div>
          <strong>Total Clicks:</strong> {totals.clicks}
        </div>
        <div>
          <strong>Total Impressions:</strong> {totals.impressions}
        </div>
        <div>
          <strong>CTR:</strong> {totals.ctr}%
        </div>
      </div>
    </div>
  );
}
