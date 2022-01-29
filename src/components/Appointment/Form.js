import React, {useState} from "react";
import classNames from "classnames";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

import "components/Appointment/styles.scss";

export default function Form (props) {
  const {onSave, onCancel, interviewers} = props;

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  /* -->Functions to either validate or cancel the Delete interview option and check that student and interviewer were selected (with the reset and error functions as well)<--*/
  const cancel = () => {
    reset();
    onCancel();
  }

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  function validate() {
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }

    if(!interviewer) {
      setError("interviewer name cannot be blank");
      return;
    } 

    setError("")
      onSave(student, interviewer);
  };
  
  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={event => setStudent(event.target.value)}
          data-testid="student-name-input"
        />
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
        interviewers={interviewers} 
        value={interviewer} 
        onChange={setInterviewer}
      />
      </form>
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
  </main>
  );
}

