import React, {Fragment} from "react";
import classNames from "classnames";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const { id, time, interview, bookInterview, cancelInterview} = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERR_SAVE";
  const ERROR_DELETE = "ERR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // if(!interview.interviewer || !interview.student) {
    //   alert("You forgot to select an interviewer or input a student name")
    // } else {
      transition(SAVING);

      bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }
   
  function deleteInterview (id) {
    transition(DELETING, true);
    cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
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
        onDelete={()=> transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
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

      {mode === CONFIRM && <Confirm
        message = {"This appointment will be deleted"}
        onConfirm = {() => deleteInterview(id)}
        onCancel = {back}
      />}

      {mode === EDIT && <Form 
        student={interview.student}
        interviewer={interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />
      }

      {mode === ERROR_SAVE && <Error 
        message = {"This appointment could not be saved, please try again"}
        onClose={back}
      />}

      {mode === ERROR_DELETE && <Error 
        message = {"This appointment could not be deleted, please try again"}
        onClose={back}
      />}
   
    </article>
  );
}