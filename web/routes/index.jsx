import { useState } from "react";
import { useAction } from "@gadgetinc/react";
import { api } from "../api";

export default function () {
  const [symptoms, setSymptoms] = useState([]);
  const [otherInfo, setOtherInfo] = useState("");
  const [{fetching, error}, create] = useAction(api.userstorage.create);

  const handleSymptomChange = (event) => {
    const symptom = event.target.value;
    if (event.target.checked) {
      setSymptoms([...symptoms, symptom]);
    } else {
      setSymptoms(symptoms.filter((s) => s !== symptom));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await create({
        otherinfo: `Selected Symptoms: ${symptoms.join(", ")}\nAdditional Info: ${otherInfo}`
      });
      // Reset form after successful submission
      setSymptoms([]);
      setOtherInfo("");
    } catch (e) {
      console.error("Error submitting form:", e);
    }
  };
 
  return (
    <> 
      <div className="info-box">
        <h2>Welcome to MediPath</h2>
        <p>The most trusted and accurate tool to recieve consultation for diagnosis. Start entering your information on the form below to get started!</p>
        <h3>Choose Your Symptoms</h3>
        {error && <div style={{color: "red"}}>Error: {error.message}</div>}
        <form onSubmit={handleSubmit}>
           <div className="button-group">
             <label>
              <input 
                type="checkbox" 
                name="symptom" 
                value="fever"
                checked={symptoms.includes("fever")}
                onChange={handleSymptomChange}
              />
               <span className="button">Fever</span>
             </label>
             <label>
              <input 
                type="checkbox" 
                name="symptom" 
                value="cough"
                checked={symptoms.includes("cough")}
                onChange={handleSymptomChange}
              />
               <span className="button">Cough</span>
             </label>
             <label>
              <input 
                type="checkbox" 
                name="symptom" 
                value="fatigue"
                checked={symptoms.includes("fatigue")}
                onChange={handleSymptomChange}
              />
               <span className="button">Fatigue</span>
             </label>
             <label>
              <input 
                type="checkbox" 
                name="symptom" 
                value="headache"
                checked={symptoms.includes("headache")}
                onChange={handleSymptomChange}
              />
               <span className="button">Headache</span>
             </label>
           </div>
          <h3>Please enter any other relevant information</h3>
          <input 
            type="text"
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
          />
          <button type="submit" disabled={fetching}>
            {fetching ? "Submitting..." : "Submit"}
          </button>
         </form>
       </div>
     </>
   );
}