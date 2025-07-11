import { useState, useEffect } from "react";

export default function AddictionTrackerDashboard() {
  const [addictions, setAddictions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddiction, setNewAddiction] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("addictions") || "[]");
    setAddictions(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("addictions", JSON.stringify(addictions));
  }, [addictions]);

  const handleAdd = () => {
    if (!newAddiction.trim()) return;
    const newEntry = {
      name: newAddiction,
      startedAt: new Date().toISOString(),
    };
    setAddictions([newEntry, ...addictions]);
    setNewAddiction("");
    setShowForm(false);
  };

  const getTimeSince = (start) => {
    const diff = Date.now() - new Date(start).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6 sm:px-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Addiction Tracker</h1>
        <button
          onClick={() => setShowForm(true)}
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-2xl shadow"
        >
          +
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white shadow-md rounded-lg p-4">
          <input
            value={newAddiction}
            onChange={(e) => setNewAddiction(e.target.value)}
            placeholder="Enter addiction name..."
            className="w-full border rounded p-2 mb-2"
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Addiction
          </button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {addictions.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-700">{item.name}</h2>
            <p className="text-gray-600 mt-2 text-sm">
              Started: {new Date(item.startedAt).toLocaleString()}
            </p>
            <p className="text-blue-600 font-bold mt-2 text-lg">
              Time since: {getTimeSince(item.startedAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


