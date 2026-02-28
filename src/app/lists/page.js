"use client";
import { useState, useEffect } from "react";

export default function ListsPage() {
  const [lists, setLists] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("lists");
    if (saved) setLists(JSON.parse(saved));
  }, []);

  const createList = () => {
    const newLists = [...lists, { name }];
    setLists(newLists);
    localStorage.setItem("lists", JSON.stringify(newLists));
    setName("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lists</h1>

      <input
        className="border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="List name"
      />
      <button
        onClick={createList}
        className="ml-2 bg-black text-white px-4 py-2"
      >
        Create
      </button>

      <ul className="mt-6">
        {lists.map((l, i) => (
          <li key={i}>{l.name}</li>
        ))}
      </ul>
    </div>
  );
}