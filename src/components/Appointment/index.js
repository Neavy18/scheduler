import React, {Fragment} from "react";
import classNames from "classnames";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";


export default function Appointment(props) {

  const {time, interview} = props;

  const interviewTruthy = (interview ? <Show name={interview.student} interviewer = {interview.interviewer}/>: <Empty/>)
  
  return (
    <article className="appointment">
      <Header 
      time={time}
      />
    {interviewTruthy}
    
    </article>
  );
}