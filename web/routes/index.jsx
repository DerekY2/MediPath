import { useState } from "react";
import { useEffect } from 'react';
import {
  useGlobalAction,
  useFetch,
  useMaybeFindFirst,
  useActionForm,
} from "@gadgetinc/react";
import { api } from "../api";

export default function () {
  const [symptoms, setSymptoms] = useState([]);
  const [otherInfo, setOtherInfo] = useState("");

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

  // used to track the reset state of the form
  const [isReset, setIsReset] = useState(true);
  // state for the currently selected diagnosis
  const [selected, setSelected] = useState("");
  // action for diagnosing with symptoms
  const { submit, register, actionData, error, formState, watch, reset } =
    useActionForm(api.queryEntries);
  const diagnoses = actionData;

  // watch changes to the quote state in our form, and store in a variable
  const textInput = watch("symptoms");

  const AIGenerator = ({prediction, symptoms, textInput})=>{
    const strSymptoms = symptoms.join(', ')
    const allInput =  `${strSymptoms}. ${textInput}`
    const parseBoldText = (text) => {
      return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };
    console.log('symptoms to be generated:', symptoms,'\ninput:', textInput)
    const [{data,fetching,error}, sendPrompt] = useFetch('/diagnosis',{
      method:'post',
      body: JSON.stringify({prediction, textInput}),
      headers:{
        "content-type":"application/json"
      },
      stream:'string'
    })

    return(
      <div className="genTextContainer">
        <button className="button analyse-btn" onClick={()=>void sendPrompt()}>Analyse: {selected}</button>
        {error && <p className="error">{error.message}</p>}
        {fetching && <div className="loader"/>}
        {data && (
          <pre className="generated-text">
          {data}
        </pre>
        )}
      </div>
    )
   }
 
  return (
    <> 
      <div className="info-box">
        <h2>Welcome to MediPath</h2>
        <p>An AI-powered tool to recieve consultation for diagnosis. Enter your symptoms to get started!</p>
        {/* <h3>Choose Your Symptoms</h3> */}
        {error && <div style={{color: "red"}}>Error: {error.message}</div>}
        <form onSubmit={async (e) => {
            e.preventDefault();
            console.log('input:',symptoms,'\ntext:',textInput)
            await submit();
            setIsReset(true);
          }}>
           {/* <input type="hidden" id="symptomsInput" name="symptoms" {...register("symptoms")} value={symptoms.join(', ')} /> */}
          <h3>Tell us about your symptoms.</h3>
          <input className="symptomInput"
          autoComplete="off"
            placeholder="E.g. headache, I can't sleep..."
            {...register("symptoms")}
            disabled={formState.isSubmitting}
          />
          <div className="btn-group">
          <button className="button reset-btn"
              disabled={!formState.isDirty}
              onClick={() => {
                // reset the form
                reset();
                setSymptoms([]);
                setIsReset(false);
              }}>Reset</button>
            <button type="submit" className="button" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? "Loading..." : "Submit"}
            </button>
            <button className="button spacer">test</button>
            
          </div>
         </form>
         {error && (
        <p className="error">
          WHOOPS! An error has occured!
        </p>
      )}
      {diagnoses && (symptoms || textInput) && isReset && (
        <div className="row">
          <b>Results:</b>
          <form action=""> 
            <div className="row selection-group" style={{display: "flex", flexWrap: "wrap",textAlign: "left",gap: 16,}}>
            {diagnoses.map((selection, i) => (
            <label key={`select_option_${i}`} className="button checkbox-btn">
              <input
                type="checkbox"
                checked={selection.diagnosis == selected}
                value={selection.diagnosis}
                onChange={(e) => {
                  console.log('Selected diagnosis:', e.target.value, '\nchecked:',selection.diagnosis == selected);
                  setSelected(e.target.value);
                  e.checked = (selection.diagnosis == selected)
                }}
                id={selection.id}
              />
              <span>{selection.diagnosis}</span>
              </label>
            ))}
            </div>
          </form>
        </div>
      )}
      {selected && (symptoms || textInput) && isReset && <AIGenerator prediction={selected} symptoms={symptoms} textInput={textInput}/>}
       </div>
     </>
   );
}

