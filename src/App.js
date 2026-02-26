import React, { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import axios from "axios";
import hospital from "./images/hospital.jpeg";
import medical1 from "./images/medical1.jpeg";
import medical2 from "./images/medical2.jpeg";


function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
  if (!searchTerm.trim()) return;

  setLoading(true);
  setSearched(true);

  try {
    const response = await axios.get(
      `http://localhost:8080/medicines/search?name=${searchTerm}`
    );

    console.log("STATUS:", response.status);
    console.log("DATA:", response.data);

    setResults(response.data.data);

  } catch (error) {
    console.log("ERROR:", error.response?.status);
    setResults([]);
  }

  setLoading(false);
};

const path = window.location.pathname;

  if (path === "/admin") {
    return <Admin />;
  }

  return (
    <div className="bg-slate-50 text-slate-800">

      {/* NAVBAR */}
      <nav className="bg-sky-600 text-white p-4 shadow-md fixed w-full z-50">
  <div className="max-w-7xl mx-auto flex justify-between items-center">

    <h1 className="font-bold text-lg md:text-xl">
      Omsai Medical Store
    </h1>

    <span
  onClick={() => window.location.href = "/admin"}
  className="text-white text-sm cursor-pointer hover:underline"
>
  Admin
</span>

  </div>
</nav>

      {/* HERO */}
      <section className="bg-gradient-to-r from-sky-600 to-teal-500 text-white pt-28 pb-20 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Trusted Healthcare Partner in Baramati
        </h1>

        <p className="text-lg mb-4">
          20 Years of Excellence in Providing Genuine Medicines & Professional Care
        </p>

        <p className="text-sm opacity-90">
          Located Inside Bobade Accident Hospital
        </p>

        <a
          href="#search"
          className="inline-block mt-8 bg-white text-sky-600 font-semibold px-8 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Check Medicine Availability
        </a>
      </section>

      {/* ABOUT */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">About Omsai Medical Store</h2>

        <p className="text-lg leading-relaxed mb-4">
          Omsai Medical Store has proudly served the Baramati community for over 20 years,
          providing genuine medicines, professional guidance, and emergency support.
        </p>

        <p>
          📍 Ring Road Opposite Market Yard, Baramati – 413102
        </p>
      </section>

      {/* PROPRIETOR */}
<section className="bg-white py-16 text-center">
  <h2 className="text-2xl font-bold mb-4">
    Proprietor
  </h2>

  <p className="font-semibold text-lg">
    Bhushan Girme
  </p>

  <p>D. Pharmacy</p>
  <p>20 Years Experience</p>

  <p className="mt-3">
    📧{" "}
    <a
      href="mailto:girme.bhushan@rediffmail.com"
      className="text-sky-600 hover:underline"
    >
      girme.bhushan@rediffmail.com
    </a>
  </p>
</section>

      {/* ASSOCIATED HOSPITAL */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Associated Hospital
        </h2>

        <p className="text-lg font-semibold mb-10">
          Bobade Accident Hospital
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg">
              Dr. Sandesh Satish Bobade
            </h3>
            <p>MBBS, MS (Orthopaedics)</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-lg">
              Dr. Satish Mahadeo Bobade
            </h3>
            <p>MBBS, MS (Orthopaedics)</p>
          </div>

        </div>
      </section>

      {/* GALLERY */}
<section className="bg-white py-16 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-2xl font-bold mb-12">
      Our Facility
    </h2>

    <div className="grid md:grid-cols-3 gap-10 items-center">

      {/* LEFT IMAGE */}
      <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-center h-72 md:h-96">
        <img
          src={medical1}
          alt="Medical Store"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* CENTER IMAGE (BIGGER) */}
      <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center justify-center h-80 md:h-[420px] scale-105">
        <img
          src={hospital}
          alt="Hospital"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* RIGHT IMAGE */}
      <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center justify-center h-72 md:h-96">
        <img
          src={medical2}
          alt="Medical Store"
          className="max-h-full max-w-full object-contain"
        />
      </div>

    </div>
  </div>
</section>

      {/* SEARCH */}
      <section id="search" className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Emergency Medicine Availability
        </h2>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Enter medicine name..."
            className="border rounded-lg px-4 py-3 w-full md:w-2/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition"
          >
            Search
          </button>
        </div>

        {loading && <p className="mt-6 text-sky-600">Searching...</p>}

        <div className="mt-12 space-y-8">

          {/* RESULTS */}
          {!loading && results.length > 0 && results.map((medicine) => (
            <div key={medicine.id} className="bg-white p-8 rounded-2xl shadow-xl text-left max-w-4xl mx-auto">
              <h3 className="font-bold text-xl mb-2">{medicine.name}</h3>
              <p>Manufacturer: {medicine.manufacturer}</p>
              <p>Price: ₹{medicine.price}</p>
              <p className="mt-3 mb-6">
                Status:{" "}
                <span className={medicine.available ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                  {medicine.available ? "Available" : "Out of Stock"}
                </span>
              </p>

              {/* IMPROVED DESKTOP BUTTONS */}
              <div className="flex flex-col gap-4 md:flex-row md:gap-8 mt-6">

                <a
                  href="tel:9730317811"
                  className="bg-green-600 text-white py-3 px-6 
                             md:py-5 md:px-10 md:text-lg 
                             rounded-xl text-center font-semibold 
                             shadow-lg hover:bg-green-700 transition 
                             md:flex-1">
                  📞 Call Now
                </a>

                <a
                  href="https://wa.me/919730317811"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 text-white py-3 px-6 
                             md:py-5 md:px-10 md:text-lg 
                             rounded-xl text-center font-semibold 
                             shadow-lg hover:bg-emerald-600 transition 
                             md:flex-1">
                  💬 WhatsApp
                </a>

                <a
                  href="https://www.google.com/maps?q=18.14540,74.58228"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-600 text-white py-3 px-6 
                             md:py-5 md:px-10 md:text-lg 
                             rounded-xl text-center font-semibold 
                             shadow-lg hover:bg-teal-500 transition 
                             md:flex-1">
                  📍 Location
                </a>

              </div>
            </div>
          ))}

          {/* NOT FOUND */}
          {!loading && searched && results.length === 0 && (
            <div className="flex justify-center">
              <div className="bg-yellow-50 p-10 rounded-2xl shadow-xl w-full max-w-2xl text-center">

                <h3 className="text-2xl font-bold mb-4 text-red-600">
                  Medicine Not Found
                </h3>

                <p className="mb-8 text-lg">
                  You can request this medicine. We will contact you shortly.
                </p>

                <RequestForm medicineName={searchTerm} />

              </div>
            </div>
          )}

        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-sky-600 text-white py-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
        <p className="mb-2">📞 9730317811</p>
        <p className="mb-2">📧 girme.bhushan@rediffmail.com</p>
        <p>📍 Located Inside Bobade Accident Hospital, Baramati</p>
      </section>

      <footer className="bg-slate-900 text-white py-6 text-center">
        © {new Date().getFullYear()} Omsai Medical Store. All Rights Reserved.
      </footer>

    </div>
  );
}

/* ================= REQUEST FORM ================= */

function RequestForm({ medicineName }) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let newErrors = {};

    // Name validation (letters + spaces only)
    if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Name must contain only letters.";
    }

    // Phone validation (exactly 10 digits)
    if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await axios.post("http://localhost:8080/requests", {
        customerName: name,
        phone: phone,
        medicineName: medicineName
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-100 p-6 rounded-xl text-center shadow-md">
        <p className="font-semibold text-green-700 text-lg">
          Request submitted successfully.
        </p>
        <p className="mt-2">We will contact you soon.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-md mx-auto text-left">

      {/* NAME INPUT */}
      <div>
        <input
          type="text"
          placeholder="Your Name"
          className="border rounded-lg px-4 py-3 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* PHONE INPUT */}
      <div>
        <input
          type="text"
          placeholder="Your Phone Number"
          className="border rounded-lg px-4 py-3 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && (
          <p className="text-red-600 text-sm mt-1">
            {errors.phone}
          </p>
        )}
      </div>

      {/* MEDICINE NAME (DISABLED) */}
      <input
        type="text"
        value={medicineName}
        disabled
        className="border rounded-lg px-4 py-3 w-full bg-gray-100"
      />

      <button
        onClick={handleSubmit}
        className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition w-full"
      >
        Submit Request
      </button>

    </div>
  );
}

export default App;