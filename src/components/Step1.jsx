import React, { useState } from 'react';

function Step1({ formData, setFormData, nextStep }) {
  const [preview, setPreview] = useState(formData.photo || null);
  const [usernameCheck, setUsernameCheck] = useState(null);
  const [errors, setErrors] = useState({});
  const [changePassword, setChangePassword] = useState(false);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setFormData({ ...formData, photo: base64 });
        setPreview(base64);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Only JPG/PNG under 2MB allowed");
    }
  };

  const handleUsername = async (e) => {
    const val = e.target.value;
    setFormData({ ...formData, username: val });

    if (val.length >= 4 && val.length <= 20 && !val.includes(" ")) {
      try {
        const res = await fetch(`http://localhost:5000/check-username?username=${val}`);
        const data = await res.json();
        setUsernameCheck(data.available ? "Available" : "Taken");
      } catch (err) {
        setUsernameCheck("Error");
      }
    } else {
      setUsernameCheck(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const err = {};
    if (!formData.name) err.name = "Name is required";
    if (!formData.age || isNaN(formData.age) || +formData.age <= 0) err.age = "Valid age is required";
    if (!formData.gender) err.gender = "Gender is required";
    if (formData.gender === "Other" && !formData.customGender) err.customGender = "Enter your gender";
    if (!formData.photo) err.photo = "Profile photo required";
    if (!formData.username || formData.username.length < 4 || formData.username.includes(" ")) {
      err.username = "4–20 chars, no spaces";
    }
    if (!formData.password && !changePassword) err.password = "Password required";

    if (changePassword) {
      if (!formData.newPassword) err.newPassword = "Enter new password";
      if (!formData.password) err.password = "Current password required";
      if (formData.newPassword && !/^(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/.test(formData.newPassword)) {
        err.newPassword = "Min 8 chars, 1 special char, 1 number";
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      if (formData.gender === "Other") {
        setFormData((prev) => ({ ...prev, gender: formData.customGender }));
      }
      nextStep();
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl h-full">
      <h2 className="text-xl font-bold mb-4">Step 1: Personal Info</h2>

      
      <label className="block font-medium">Profile Photo</label>
      <input type="file" onChange={handlePhoto} className="mt-1 mb-2" />
      {preview && <img src={preview} alt="preview" className="w-24 h-24 object-cover rounded-md mb-2" />}
      {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}

      
      <label className="block mt-4 font-medium">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mt-1"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      
      <label className="block mt-4 font-medium">Age</label>
      <input
        type="number"
        name="age"
        value={formData.age || ""}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mt-1"
      />
      {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

      
      <label className="block mt-4 font-medium">Gender</label>
      <select
        name="gender"
        value={formData.gender || ""}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mt-1"
      >
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}

      
      {formData.gender === "Other" && (
        <>
          <label className="block mt-4 font-medium">Please specify</label>
          <input
            type="text"
            name="customGender"
            value={formData.customGender || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          />
          {errors.customGender && <p className="text-red-500 text-sm">{errors.customGender}</p>}
        </>
      )}

      
      <label className="block mt-4 font-medium">Username</label>
      <input
        type="text"
        value={formData.username || ""}
        onChange={handleUsername}
        className="w-full border px-3 py-2 rounded mt-1"
      />
      {usernameCheck && <p className="text-sm">{usernameCheck}</p>}
      {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

      
      <label className="block mt-4 font-medium">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password || ""}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mt-1"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

     
      {!changePassword && (
        <button
          type="button"
          onClick={() => setChangePassword(true)}
          className="text-blue-600 mt-2 text-sm underline"
        >
          Change Password?
        </button>
      )}

      {changePassword && (
        <>
          <label className="block mt-4 font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded mt-1"
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
        </>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Step1;
