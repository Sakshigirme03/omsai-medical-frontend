import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

/* ================= CONFIG ================= */

const API_BASE = "https://medical-store-ipem.onrender.com";




function AdminLogin({ onLogin }) {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
  try {
    const token = btoa(username + ":" + password);

    // Save token for future API calls
    localStorage.setItem("authToken", token);

// Test authentication
await axios.get(
  "https://medical-store-ipem.onrender.com/requests",
  {
    headers: {
      Authorization: "Basic " + token,
    },
  }
);

// Tell Admin component we are logged in
onLogin(token);

// Go to admin page
navigate("/admin");

  } catch (error) {
    setError("Invalid credentials");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-600 to-teal-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-sky-700 mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="border w-full p-3 rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 mb-3 text-sm">{error}</p>
        )}

        <button
          onClick={handleLogin}
          className="bg-sky-600 text-white w-full py-3 rounded-lg hover:bg-teal-500 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

function Admin() {

  const [auth, setAuth] = useState(() => {
    return localStorage.getItem("authToken");
  });

  const [requests, setRequests] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    manufacturer: "",
    price: "",
    quantity: ""
  });

  /* ================= HELPER ================= */

  const getAuthHeader = () => {
    const token = localStorage.getItem("authToken");
    return {
      headers: {
        Authorization: "Basic " + token
      }
    };
  };

  /* ================= FETCH ================= */

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/requests`,
        getAuthHeader()
      );
      setRequests(res.data.data || []);
    } catch (err) {
      console.error("Fetch Requests Error:", err.response?.data || err.message);
    }
  };

  const fetchMedicines = async () => {
    try {
      const res = await axios.get(`${API_BASE}/medicines`);
      setMedicines(res.data.data || []);
    } catch (err) {
      console.error("Fetch Medicines Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchRequests();
      fetchMedicines();
    }
  }, [auth]);

  /* ================= REQUEST ACTIONS ================= */

  const markCompleted = async (id) => {
    try {
      await axios.put(
        `${API_BASE}/requests/${id}/complete`,
        {},
        getAuthHeader()
      );
      fetchRequests();
    } catch (err) {
      console.error("Complete Error:", err.response?.data || err.message);
      alert("Failed to complete request.");
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(
        `${API_BASE}/requests/${id}`,
        getAuthHeader()
      );
      fetchRequests();
    } catch (err) {
      console.error("Delete Request Error:", err.response?.data || err.message);
      alert("Failed to delete request.");
    }
  };

  /* ================= MEDICINE ACTIONS ================= */

  const addMedicine = async () => {
    try {
      await axios.post(
        `${API_BASE}/medicines`,
        {
          name: newMedicine.name,
          manufacturer: newMedicine.manufacturer,
          price: parseFloat(newMedicine.price),
          quantity: parseInt(newMedicine.quantity),
          available: true
        },
        getAuthHeader()
      );

      setNewMedicine({
        name: "",
        manufacturer: "",
        price: "",
        quantity: ""
      });

      fetchMedicines();

    } catch (err) {
      console.error("Add Medicine Error:", err.response?.data || err.message);
      alert("Failed to add medicine.");
    }
  };

  const deleteMedicine = async (id) => {
    try {
      await axios.delete(
        `${API_BASE}/medicines/${id}`,
        getAuthHeader()
      );
      fetchMedicines();
    } catch (err) {
      console.error("Delete Medicine Error:", err.response?.data || err.message);
      alert("Failed to delete medicine.");
    }
  };

  /* ================= DASHBOARD DATA ================= */

  const totalRequests = requests.length;
  const pending = requests.filter(r => r.status === "PENDING").length;
  const completed = requests.filter(r => r.status === "COMPLETED").length;
  const totalMedicines = medicines.length;

  const chartData = [
    { name: "Pending", value: pending },
    { name: "Completed", value: completed }
  ];

  /* ================= RENDER ================= */

  if (!auth) {
    return (
      <AdminLogin
        onLogin={(token) => {
          localStorage.setItem("authToken", token);
          setAuth(token);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-sky-700">
          Admin Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("authToken");
            setAuth(null);
          }}
          className="text-sky-600 hover:underline font-medium"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Requests" value={totalRequests} color="bg-sky-600" />
        <StatCard title="Pending" value={pending} color="bg-orange-500" />
        <StatCard title="Completed" value={completed} color="bg-green-600" />
        <StatCard title="Total Medicines" value={totalMedicines} color="bg-purple-600" />
      </div>

      {/* REQUEST TABLE */}
      <div className="bg-white rounded-xl shadow p-6 mb-12">
        <h2 className="text-xl font-semibold mb-4">Medicine Requests</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-sky-100">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Medicine</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b">
                  <td className="p-3">{req.id}</td>
                  <td className="p-3">{req.customerName}</td>
                  <td className="p-3">{req.phone}</td>
                  <td className="p-3">{req.medicineName}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${
                      req.status === "COMPLETED"
                        ? "bg-green-600"
                        : "bg-orange-500"
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      disabled={req.status === "COMPLETED"}
                      onClick={() => markCompleted(req.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() => deleteRequest(req.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* MEDICINE SECTION */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Manage Medicines</h2>

        <div className="grid md:grid-cols-5 gap-4 mb-6">
          <input
            placeholder="Name"
            className="border p-2 rounded"
            value={newMedicine.name}
            onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
          />
          <input
            placeholder="Manufacturer"
            className="border p-2 rounded"
            value={newMedicine.manufacturer}
            onChange={(e) => setNewMedicine({ ...newMedicine, manufacturer: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded"
            value={newMedicine.price}
            onChange={(e) => setNewMedicine({ ...newMedicine, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border p-2 rounded"
            value={newMedicine.quantity}
            onChange={(e) => setNewMedicine({ ...newMedicine, quantity: e.target.value })}
          />

          <button
            onClick={addMedicine}
            className="bg-sky-600 text-white rounded px-4"
          >
            Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-purple-100">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Manufacturer</th>
                <th className="p-3">Price</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Delete</th>
              </tr>
            </thead>

            <tbody>
              {medicines.map((med) => (
                <tr key={med.id} className="border-b">
                  <td className="p-3">{med.id}</td>
                  <td className="p-3">{med.name}</td>
                  <td className="p-3">{med.manufacturer}</td>
                  <td className="p-3">₹{med.price}</td>
                  <td className="p-3">{med.quantity}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteMedicine(med.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}


function StatCard({ title, value, color }) {
  return (
    <div className={`${color} text-white rounded-xl p-6 shadow`}>
      <h3 className="text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default Admin;