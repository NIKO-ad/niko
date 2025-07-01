import React, { useEffect, useState } from "react";

export default function App() {
  const [metrics, setMetrics] = useState([]);
  const [products, setProducts] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/metrics").then((res) => res.json()),
      fetch("http://localhost:5000/api/products").then((res) => res.json()),
      fetch("http://localhost:5000/api/links").then((res) => res.json()),
    ])
      .then(([m, p, l]) => {
        setMetrics(m);
        setProducts(p);
        setLinks(l);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data from backend.");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", background: "#f8f8f8", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Affiliate AI Ops Hub</h1>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <h2 style={{ fontSize: "22px" }}>Metrics</h2>
          <ul>{metrics.map((m, i) => <li key={i}>{m.label}: {m.value}</li>)}</ul>

          <h2 style={{ fontSize: "22px", marginTop: "20px" }}>Products</h2>
          <ul>{products.map((p, i) => <li key={i}>{p.name} — Score: {p.score}</li>)}</ul>

          <h2 style={{ fontSize: "22px", marginTop: "20px" }}>Affiliate Links</h2>
          <ul>{links.map((l, i) => <li key={i}>{l.name}: {l.clicks} clicks, {l.conversions} conversions</li>)}</ul>
        </>
      )}
    </div>
  );
}
