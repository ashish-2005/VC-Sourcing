"use client";

import { useParams } from "next/navigation";
import { companies } from "@/lib/mockData";
import { useState } from "react";

export default function CompanyProfile() {
  const { id } = useParams();
  const company = companies.find((c) => c.id === id);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEnrich = async () => {
    setLoading(true);

    const res = await fetch("/api/enrich", {
      method: "POST",
      body: JSON.stringify({ url: company.website }),
    });

    const result = await res.json();
    setData(result);

    localStorage.setItem(`enrich-${id}`, JSON.stringify(result));

    setLoading(false);
  };

  if (!company) return <div>Not found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold">{company.name}</h1>
      <p>{company.industry}</p>

      <button
        className="mt-4 bg-black text-white px-4 py-2"
        onClick={handleEnrich}
      >
        {loading ? "Loading..." : "Enrich"}
      </button>

      {data && (
        <div className="mt-6 border p-4 bg-white rounded">
          <h2 className="font-bold">Summary</h2>
          <p>{data.content}</p>

          <h3 className="mt-4 font-bold">Source</h3>
          <p>{data.source}</p>
          <p>{new Date(data.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}