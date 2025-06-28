import React, { useState } from 'react'

function Summary({ formData, setFormData, prevStep }) {
  const [subscriptionPlan, setSubscriptionPlan] = useState(formData.subscriptionPlan || 'Basic')
  const [newsletter, setNewsletter] = useState(formData.newsletter ?? true)

  const handleSubmit = () => {
  const finalData = {
    ...formData,
    subscriptionPlan,
    newsletter,
  };

  fetch(`${import.meta.env.VITE_BACKEND_URL}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(finalData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Profile submitted successfully!");
        console.log("Saved:", finalData);
      } else {
        alert("Failed to submit.");
      }
    })
    .catch(err => {
      console.error("Submit error:", err);
      alert("Server error.");
    });
};

  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Summary</h2>

      <ul className="space-y-2 mb-6">
        {Object.entries(formData).map(([key, value]) => (
          <li key={key} className="text-sm">
            <strong className="capitalize">{key}:</strong>{" "}
            {typeof value === 'string' && value.startsWith('data:image') ? (
              <img src={value} alt="Uploaded" className="mt-2 w-24 rounded-md shadow" />
            ) : (
              <span>{String(value)}</span>
            )}
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Subscription Plan</h3>
        {['Basic', 'Pro', 'Enterprise'].map(plan => (
          <label key={plan} className="block mb-1">
            <input
              type="radio"
              name="subscription"
              value={plan}
              checked={subscriptionPlan === plan}
              onChange={(e) => setSubscriptionPlan(e.target.value)}
              className="mr-2"
            />
            {plan}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(e) => setNewsletter(e.target.checked)}
            className="mr-2"
          />
          Subscribe to newsletter
        </label>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Summary
