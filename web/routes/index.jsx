import { api } from "../api";


export default function () {
  
  return (
    <>
        <div className="info-box">
          <h2>Welcome to MediPath</h2>
          <p>The most trusted and accurate tool to recieve consultation for diagnosis. Start entering your information on the form below to get started!  </p>
        <h3>Choose Your Symptoms</h3>
        <form>
          <div className="button-group">
            <label>
              <input type="checkbox" name="symptom" value="fever" />
              <span className="button">Fever</span>
            </label>
            <label>
              <input type="checkbox" name="symptom" value="cough" />
              <span className="button">Cough</span>
            </label>
            <label>
              <input type="checkbox" name="symptom" value="fatigue" />
              <span className="button">Fatigue</span>
            </label>
            <label>
              <input type="checkbox" name="symptom" value="headache" />
              <span className="button">Headache</span>
            </label>
              <button type="submit">Submit</button>
          </div>
            <h3>Please enter any other relevant information </h3>
            <input type = "text"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}