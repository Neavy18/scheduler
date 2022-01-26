import React, {useState} from "react";
import classNames from "classnames";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

import "components/Appointment/styles.scss";

export default function Form (props) {
  const {onSave, onCancel, interviewers = []} = props;

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  
  const cancel = () => {
    reset();
    onCancel();
  }

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  function confirm() {
    onSave(student, interviewer)
  }

  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form onSubmit={event => event.preventDefault()}autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={student}
          onChange={event => setStudent(event.target.value)}
        />
          <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer}
      />
      </form>
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={confirm}>Save</Button>
      </section>
    </section>
  </main>
  );
}





// const [student, setStudent] = useState(props.student || "");
// const [interviewer, setInterviewer] = useState(props.interviewer || null);

// export default function Form (props) {
//   return (
//   <main className="appointment__card appointment__card--create">
//     <section className="appointment__card-left">
//       <form autoComplete="off">
//         <input
//           className="appointment__create-input text--semi-bold"
//           name="name"
//           type="text"
//           placeholder="Enter Student Name"
//           onChange={event => setName(event.target.value)}
//         />
//       </form>
//       <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer}
//       />
//     </section>
//     <section className="appointment__card-right">
//       <section className="appointment__actions">
//         <Button danger {/* your code goes here */}>Cancel</Button>
//         <Button confirm {/* your code goes here */}>Save</Button>
//       </section>
//     </section>
//   </main>
//   );
// }