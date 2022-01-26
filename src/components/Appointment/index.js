import React, {Fragment} from "react";
import classNames from "classnames";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const {id, time, interview, bookInterview} = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";


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
    .then(() => transition(SHOW))
  }
   
  return (
    <article className="appointment">
      <Header 
      time={time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && <Show
      student={interview && interview.student}
      interviewer={interview && interview.interviewer}
      />}

      {mode === SAVING && <Status 
      message ={"SAVING"}
      />}

      {mode === CREATE && <Form 
        interviewers = {props.interviewers}
        onSave = {save}
        onCancel = {back}
      />}
   
    </article>
  );
}