import React, { useState } from 'react'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step3' 
import Summary from './components/Summary'


function App() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})

  return (
    <div>
      {step === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          nextStep={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          nextStep={() => setStep(3)}
          prevStep={() => setStep(1)}
        />
      )}

      {step === 3 && (
      <Step3
     formData={formData}
     setFormData={setFormData}
     prevStep={() => setStep(2)}
     nextStep={() => setStep(4)}
      />
)}

{step === 4 && (
  <Summary
    formData={formData}
    prevStep={() => setStep(3)}
  />
)}


    </div>
  )
}

export default App
