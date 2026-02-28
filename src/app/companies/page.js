"use client";
import { useState } from "react";
import Link from "next/link";
import { companies } from "@/lib/mockData";
import { useSearchParams } from "next/navigation";

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 2;

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Companies</h1>

      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border bg-white rounded">
        <thead className="bg-gray-200">
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Stage</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((company) => (
            <tr key={company.id} className="border">
              <td>
                <Link
                  href={`/companies/${company.id}`}
                  className="text-blue-600"
                >
                  {company.name}
                </Link>
              </td>
              <td>{company.industry}</td>
              <td>{company.stage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 space-x-2">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * ITEMS_PER_PAGE >= filtered.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}