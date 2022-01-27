import React, { useState } from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  

  const {interviewers, value, onChange} = props; 

  const parsedInterviewerList = interviewers && interviewers.map(
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