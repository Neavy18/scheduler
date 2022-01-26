import React, {Fragment} from "react";
import classNames from "classnames";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interview, bookInterview, cancelInterview} = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(props.id, interview)
    transition(SHOW)
  }
   
  function deleteInterview (id) {
    transition(DELETING);
    cancelInterview(props.id)
    transition(EMPTY)
  }
  return (
    <article className="appointment">
      <Header 
        time={time}
      />

      {mode === EMPTY && <Empty 
        onAdd={() => transition(CREATE)} 
      />}

      {mode === SHOW && <Show
        student={interview && interview.student}
        interviewer={interview && interview.interviewer}
        onDelete={deleteInterview}
      />}

      {mode === SAVING && <Status 
        message ={"SAVING"}
      />}

      {mode === CREATE && <Form 
        interviewers = {props.interviewers}
        onSave = {save}
        onCancel = {back}
      />}

      {mode === DELETING && <Status
      message = {"DELETING"}
      />}
   
    </article>
  );
}