import React from 'react';

function Step2({ formData, setFormData, nextStep, prevStep }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};

    if (!formData.profession) {
      err.profession = "Select a profession";
    }

    if (formData.profession === "Entrepreneur" && !formData.companyName) {
      err.companyName = "Company Name required for Entrepreneurs";
    }

    if (Object.keys(err).length > 0) {
      alert(Object.values(err).join('\n'));
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Step 2: Professional Details</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Profession</label>
        <select
          name="profession"
          value={formData.profession || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select</option>
          <option value="Student">Student</option>
          <option value="Developer">Developer</option>
          <option value="Entrepreneur">Entrepreneur</option>
        </select>
      </div>

      {formData.profession === "Entrepreneur" && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      )}

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

export default Step2;
