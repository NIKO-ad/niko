
import React, { useEffect, useState } from "react";

export default function App() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Affiliate AI Ops Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
