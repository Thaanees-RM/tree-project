import React, { useState } from "react";

const initialData = [
  {
    name: "Samson",
    tree: "Jack",
    location: "Kalututa",
    status: "Pending",
    image: "https://via.placeholder.com/400x300?text=Samson",
  },
  {
    name: "Boult",
    tree: "Jack",
    location: "Kandy",
    status: "Pending",
    image: "https://via.placeholder.com/400x300?text=Boult",
  },
  {
    name: "Rudran",
    tree: "Jack",
    location: "Ja-ela",
    status: "Pending",
    image: "https://via.placeholder.com/400x300?text=Rudran",
  },
  {
    name: "Krunal",
    tree: "Jack",
    location: "Wellampitiya",
    status: "Pending",
    image: "https://via.placeholder.com/400x300?text=Krunal",
  },
  {
    name: "Lucy",
    tree: "Jack",
    location: "Rajagiriya",
    status: "Pending",
    image: "https://via.placeholder.com/400x300?text=Lucy",
  },
  {
    name: "Shavon",
    tree: "Jack",
    location: "Colombo",
    status: "Approved",
    image: "https://via.placeholder.com/400x300?text=Shavon",
  },
  {
    name: "Jackson",
    tree: "Jack",
    location: "Ambatonta",
    status: "Rejected",
    image: "https://via.placeholder.com/400x300?text=Jackson",
  },
  {
    name: "Jaiswal",
    tree: "Jack",
    location: "Galle",
    status: "Approved",
    image: "https://via.placeholder.com/400x300?text=Jaiswal",
  },
  {
    name: "Hardik",
    tree: "Jack",
    location: "Ragama",
    status: "Approved",
    image: "https://via.placeholder.com/400x300?text=Hardik",
  },
  {
    name: "Rohit",
    tree: "Jack",
    location: "Wattala",
    status: "Rejected",
    image: "https://via.placeholder.com/400x300?text=Rohit",
  },
  {
    name: "Virat",
    tree: "Jack",
    location: "Hunupitiya",
    status: "Rejected",
    image: "https://via.placeholder.com/400x300?text=Virat",
  },
];

const Dashboard = () => {
  const [data, setData] = useState(initialData);
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalImage, setModalImage] = useState(null);

  const total = data.length;
  const pending = data.filter((d) => d.status === "Pending").length;
  const approvedRejected = total - pending;

  const filteredData =
    statusFilter === "All"
      ? data
      : data.filter((d) =>
          statusFilter === "Verified"
            ? d.status === "Approved" || d.status === "Rejected"
            : d.status === statusFilter
        );

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], status: newStatus };
    setData(updatedData);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col justify-between p-6">
        <div>
          <div className="text-2xl font-bold mb-12">Logo</div>
          <nav className="space-y-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 13h14v-2H3v2zM3 9h14V7H3v2z" />
              </svg>
              Overview
            </button>
            <button className="text-sm px-4 py-2 hover:bg-gray-800 rounded-md">
              Settings
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div>Shavon Fernando</div>
            <div className="text-gray-400 text-xs">shav@gmail.com</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-10 relative">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Total Submission */}
          <div
            className={`p-6 rounded-lg shadow cursor-pointer ${
              statusFilter === "All"
                ? "text-white bg-gradient-to-r from-cyan-400 to-blue-500"
                : "bg-white text-black hover:bg-gray-50"
            }`}
            onClick={() => setStatusFilter("All")}
          >
            <p className="text-sm">Total Submission</p>
            <h3 className="text-3xl font-bold">{total}</h3>
          </div>

          {/* Pending Verification */}
          <div
            className={`p-6 rounded-lg shadow cursor-pointer ${
              statusFilter === "Pending"
                ? "text-white bg-gradient-to-r from-cyan-400 to-blue-500"
                : "bg-white text-black hover:bg-gray-50"
            }`}
            onClick={() => setStatusFilter("Pending")}
          >
            <p className="text-sm">Pending Verification</p>
            <h3 className="text-3xl font-bold">{pending}</h3>
          </div>

          {/* Approved/Rejected */}
          <div
            className={`p-6 rounded-lg shadow cursor-pointer ${
              statusFilter === "Verified"
                ? "text-white bg-gradient-to-r from-cyan-400 to-blue-500"
                : "bg-white text-black hover:bg-gray-50"
            }`}
            onClick={() => setStatusFilter("Verified")}
          >
            <p className="text-sm">Appr/Rejec. Verification</p>
            <h3 className="text-3xl font-bold">{approvedRejected}</h3>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Tree</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Image</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{entry.name}</td>
                  <td className="px-6 py-4">{entry.tree}</td>
                  <td className="px-6 py-4">{entry.location}</td>
                  <td
                    className="px-6 py-4 text-blue-500 underline cursor-pointer"
                    onClick={() => setModalImage(entry.image)}
                  >
                    View
                  </td>
                  <td className="px-6 py-4">
                    {entry.status === "Pending" ? (
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600"
                          onClick={() => handleStatusChange(index, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          Capture
                          className="px-2 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
                          onClick={() => handleStatusChange(index, "Rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`px- repose2 py-1 rounded-md text-xs font-medium ${
                          entry.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {entry.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalImage && (
          <div
            role="button"
            tabIndex={0}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            aria-label="Close modal"
            onClick={() => setModalImage(null)}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                setModalImage(null);
              }
            }}
            style={{ cursor: "pointer", display: "flex" }}
          >
            <dialog
              open
              className="bg-white rounded-lg p-4 max-w-2xl shadow-lg relative"
              style={{ padding: 0, border: "none", maxWidth: "32rem" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                onClick={() => setModalImage(null)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (
                    e.key === "Escape" ||
                    e.key === "Enter" ||
                    e.key === " "
                  ) {
                    setModalImage(null);
                  }
                }}
                aria-label="Close image preview"
              >
                ✕
              </button>
              <img
                src={modalImage}
                alt="Preview"
                className="w-full h-auto rounded-md"
              />
            </dialog>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
