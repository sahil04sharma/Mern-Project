import React, { useEffect, useState } from 'react';

function Step3({ formData, setFormData, prevStep, nextStep }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch countries on load
  useEffect(() => {
    fetch('http://localhost:10000/countries')
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  // Update states and reset address fields when country changes
  useEffect(() => {
    if (formData.country) {
      fetch(`http://localhost:10000/states/${formData.country}`)
        .then(res => res.json())
        .then(data => setStates(data));
    } else {
      setStates([]);
    }

    // Reset address fields when country changes
    setFormData(prev => ({
      ...prev,
      address1: '',
      state: '',
      city: ''
    }));
    setCities([]);
  }, [formData.country]);

  // Update cities when state changes
  useEffect(() => {
    if (formData.country && formData.state) {
      fetch(`http://localhost:10000/cities/${formData.country}/${formData.state}`)
        .then(res => res.json())
        .then(data => setCities(data));

      setFormData(prev => ({ ...prev, city: '' }));
    } else {
      setCities([]);
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const { dob, address1, country, state, city } = formData;

    if (!dob || !address1 || !country || !state || !city) {
      alert(" Please complete all fields including Date of Birth and Address");
      return;
    }

    const selectedDate = new Date(dob);
    const today = new Date();

    if (selectedDate > today) {
      alert(" Date of Birth cannot be in the future");
      return;
    }

    nextStep();
  };

  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Step 3: Address & Preferences</h2>

      {/* Date of Birth */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob || ""}
          onChange={handleChange}
          max={todayStr}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

     

      {/* Country */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Country</label>
        <select
          name="country"
          value={formData.country || ''}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select Country</option>
          {countries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* State */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">State</label>
        <select
          name="state"
          value={formData.state || ''}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select State</option>
          {states.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">City</label>
        <select
          name="city"
          value={formData.city || ''}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
       {/* Address */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Address Line 1</label>
        <input
          type="text"
          name="address1"
          value={formData.address1 || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Step3;
