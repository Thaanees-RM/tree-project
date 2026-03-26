
import { useEffect, useState } from "react";
import axios from "axios";
import emailjs from '@emailjs/browser';




const Dashboard = () => {

  const [data, setData] = useState([]);

  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      }
    };

    fetchSubmissions();
  }, []);

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
  
  // const handleStatusChange = async (id, newStatus) => {
  //   try {
  //     let route;
  //     if (newStatus === "Approved") route = "approve";
  //     else if (newStatus === "Rejected") route = "reject";
  //     else if (newStatus === "Pending") route = "pending";
  //     else return; // invalid status

  //     await axios.put(`${import.meta.env.VITE_API_URL}/users/${id}/${route}`);


  //     setData(prev =>
  //       prev.map(item => (item._id === id ? { ...item, status: newStatus } : item))
  //     );
  //   } catch (error) {
  //     console.error("Failed to update status", error);
  //     alert("Status update failed");
  //   }
  // };

  const handleStatusChange = async (id, newStatus) => {
    try {
      let route;
      if (newStatus === "Approved") route = "approve";
      else if (newStatus === "Rejected") route = "reject";
      else if (newStatus === "Pending") route = "pending";
      else return;

      const res = await axios.put(`${import.meta.env.VITE_API_URL}/users/${id}/${route}`);

      // Find the approved user details
      const approvedUser = data.find((item) => item._id === id);

      // Get the Cloudinary certificate URL from backend response
      const certificateUrl = res.data.certificateUrl;

      //const approvedUser = res.data.data;
      //const certificateUrl = res.data.certificateUrl;

      // Trigger EmailJS only on approval
      if (newStatus === "Approved") {
        emailjs.send(
          'service_oqtrltd',
          'template_qbh5fp6',
          {
            to_name: `${approvedUser.firstName} ${approvedUser.lastName}`,
            to_email: approvedUser.email,
            message: "Thank you for participating in the Tree Plantation program. Please find your certificate attached or via link.",
            //certificate_link: `${window.location.origin}/certificates/${approvedUser._id}.pdf` 
            //certificate_link: `${window.location.origin}/certificates/Certificate_${approvedUser._id}.pdf`
            //certificate_link: `${import.meta.env.VITE_API_URL}/certificates/Certificate_${approvedUser._id}.pdf`,
            certificate_link: certificateUrl, 
          },
          'KI-n_u7uxFRxMyzRx'
        )
        .then((res) => console.log("Email sent!", res.text))
        .catch((err) => console.error("EmailJS error:", err));
      }

      setData(prev =>
        prev.map(item => (item._id === id ? { ...item, status: newStatus } : item))
      );
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Status update failed");
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black text-white flex md:flex-col justify-between items-start p-6">
        <div>
          <div className="text-2xl font-bold mb-12">Logo</div>
          <nav className="space-y-2 ">
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
      <main className="flex-1 bg-gray-100 p-4 md:p-10 relative overflow-auto">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

        {/* Stat Cards */}
        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">

          {/* Total Submissions */}
          <div
            className={`p-6 rounded-lg shadow cursor-pointer ${
              statusFilter === "All"
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white"

                : "bg-white text-black hover:bg-gray-50"
            }`}
            onClick={() => setStatusFilter("All")}
          >
            <p className="text-sm">Total Submission</p>
            <h3 className="text-3xl font-bold">{total}</h3>
          </div>


          {/* Pending Submissions */}
          <div
            className={`p-6 rounded-lg shadow cursor-pointer ${
              statusFilter === "Pending"
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white"

                : "bg-white text-black hover:bg-gray-50"
            }`}
            onClick={() => setStatusFilter("Pending")}
          >
            <p className="text-sm">Pending Verification</p>
            <h3 className="text-3xl font-bold">{pending}</h3>
          </div>


          {/* Approved/Rejected Submissions */}
          <div
            className={`p-6 rounded-lg shadow cursor-pointer ${
              statusFilter === "Verified"
                ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white"

                : "bg-white text-black hover:bg-gray-50"
            }`}
            onClick={() => setStatusFilter("Verified")}
          >

            <p className="text-sm">Verified Submissions</p>

            <h3 className="text-3xl font-bold">{approvedRejected}</h3>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto max-w-full">
          <table className="md:table-fixed w-full text-sm text-left">
            <thead className="bg-white text-gray-500 border-b">
              <tr>
                <th className="px-6 py-4 font-medium md:w-[20%]">Name</th>
                <th className="px-6 py-4 font-medium md:w-[20%]">Tree</th>
                <th className="px-6 py-4 font-medium md:w-[20%]">Location</th>
                <th className="px-6 py-4 font-medium md:w-[20%]">Image</th>
                <th className="px-6 py-4 font-medium md:w-[20%]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => {

                
                
                return (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 md:w-[200px] break-words ">{entry.firstName} {entry.lastName}</td>
                  <td className="px-6 py-4 md:w-[200px] break-words ">{entry.tree}</td>
                  <td className="px-6 py-4 md:w-[150px] break-words ">{entry.location}</td>
                  <td className="px-6 py-4 md:w-[150px] text-blue-500 underline cursor-pointer" 
                  //onClick={() => setModalImage(entry.imagePath)}
                  onClick={() => setSelectedEntry(entry)}
                  >
                    View
                  </td>
                  
                  <td className="px-6 py-4 md:w-[150px]">
                    {statusFilter === "All" ? (
                      <select
                        value={entry.status}
                        onChange={(e) => handleStatusChange(entry._id, e.target.value)}
                        className={`px-2 py-1 rounded-md text-xs font-medium cursor-pointer
                          ${
                            entry.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : entry.status === "Rejected"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium
                          ${
                            entry.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : entry.status === "Rejected"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-700"
                          }`}

                      >
                        {entry.status}
                      </span>
                    )}
                  </td>
                </tr>
              )})}
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
        {selectedEntry && (
          
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedEntry(null)}
          >
            <div
              className="bg-white rounded-lg p-4 max-w-2xl shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                onClick={() => setSelectedEntry(null)}
              >
                ✕
              </button>
              <img
                src= {selectedEntry.imagePath}
                alt="Preview"
                className="w-100 h-100 object-cover rounded-md"
              />
              <p className="mt-2 text-sm text-gray-700">
                Uploaded by: {selectedEntry.firstName} {selectedEntry.lastName}
              </p>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;
