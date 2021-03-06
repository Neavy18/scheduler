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
import "components/Appointment/styles.scss"

//All the necessary Appointment components
export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview} = props;

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
    interview ? SHOW : EMPTY
  );
  
  //Save function with the SAVING load screen and the book interview
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    //Located in the hooks folder under useApplicationData.js
    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  };
   
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
        interviewers = {interviewers}
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
        interviewers={interviewers}
        onSave={save}
        onCancel={back}
      />}

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