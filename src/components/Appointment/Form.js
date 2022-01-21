import React, {useState} from "react";
import classNames from "classnames";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

import "components/Appointment/styles.scss";

export default function Form (props) {
  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          /*
            This must be a controlled component
            your code goes here
          */
        />
      </form>
      <InterviewerList interviewrs={props.interviewers}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger {/* your code goes here */}>Cancel</Button>
        <Button confirm {/* your code goes here */}>Save</Button>
      </section>
    </section>
  </main>
  );
}