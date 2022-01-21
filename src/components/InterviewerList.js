import React, { useState } from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"

export default function InterviewerList(props) {

  const {interviewers} = props; 
/* ADDED THIS CONST SO STORYBOOK WOULD STOP YELLING BUT THERE IS NO LONGER A CONSOLE LOG? NORMAL?*/
  const [value, onChange] = useState("")

  const parsedInterviewerList = interviewers.map(
    (interviewer) => {
      return (
        <InterviewerListItem 
        key = {interviewer.id}
        name = {interviewer.name}
        avatar = {interviewer.avatar}
        selected = {interviewer.id === value}
        setInterviewer = {()=> onChange(interviewer.id)}
        />
      );
    }
  );
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light"> Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewerList}</ul>
    </section>
  );
}